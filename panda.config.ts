import { defineConfig, defineGlobalStyles } from '@pandacss/dev'
import postcss from 'postcss'

const globalCss = defineGlobalStyles({
  'html, body': {
    bg: 'neutral.50',
    color: 'neutral.900',
    '--global-font-body':
      'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Hiragino Kaku Gothic Pro, Noto Sans JP, sans-serif',
    letterSpacing: '0.01em',
  },
  body: {
    display: 'grid',
    gridTemplateRows: 'auto 1fr auto',
    gridTemplateColumns: '100%',
    minHeight: '100svh',
  },
})

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ['./app/**/*.{js,jsx,ts,tsx}'],

  // Files to exclude
  exclude: [],

  strictTokens: true,
  strictPropertyValues: true,

  // Useful for theme customization
  theme: {
    extend: {},
  },

  patterns: {
    extend: {
      container: {
        transform(props) {
          return {
            w: 'full',
            maxWidth: '4xl',
            mx: 'auto',
            px: { base: '4', md: '6', lg: '8' },
            ...props,
          }
        },
      },
      button: {
        description: 'A simple button',
        transform(props) {
          return {
            fontSize: 'sm',
            fontWeight: 'medium',
            rounded: 'sm',
            _hover: { bg: 'neutral.200' },
            transition: 'background',
            cursor: 'pointer',
            ...props,
          }
        },
      },
    },
  },

  hooks: {
    'cssgen:done': ({ artifact, content }) => {
      if (artifact === 'styles.css') {
        return removeUnusedCssVars(removeUnusedKeyframes(content))
      }
      return content
    },
  },

  // The output directory for your css system
  outdir: 'styled-system',

  globalCss,
})

interface UseRecord {
  uses: number
  dependencies: Set<string>
  declarations: Set<postcss.Declaration>
}

const varRegex = /var\(\s*(?<name>--[^ ,);]+)/g

const removeUnusedCssVars = (css: string) => {
  const root = postcss.parse(css)

  const records = new Map<string, UseRecord>()

  const getRecord = (variable: string): UseRecord => {
    let record = records.get(variable)
    if (!record) {
      record = { uses: 0, dependencies: new Set(), declarations: new Set() }
      records.set(variable, record)
    }
    return record
  }

  const registerUse = (variable: string, ignoreList = new Set<string>()) => {
    const record = getRecord(variable)
    record.uses++
    ignoreList.add(variable)
    for (const dependency of record.dependencies) {
      if (!ignoreList.has(dependency)) registerUse(dependency, ignoreList)
    }
  }

  const registerDependency = (variable: string, dependency: string) => {
    const record = getRecord(variable)
    record.dependencies.add(dependency)
  }

  // Detect variable uses
  root.walkDecls((decl) => {
    const parent = decl.parent
    if (!parent) return

    if (
      parent.type === 'rule' &&
      (parent as postcss.Rule).selector === ':root'
    ) {
      return
    }

    const isVar = decl.prop.startsWith('--')

    // Initiate record
    if (isVar) getRecord(decl.prop).declarations.add(decl)

    if (!decl.value.includes('var(')) return

    for (const match of decl.value.matchAll(varRegex)) {
      const variable = match.groups?.name?.trim()
      if (!variable) continue

      if (isVar) {
        registerDependency(decl.prop, variable)
      } else {
        registerUse(variable)
      }
    }
  })

  //   console.log(records)
  // Remove unused variables
  for (const { uses, declarations } of records.values()) {
    if (uses === 0) {
      for (const decl of declarations) {
        // console.log(decl.parent)
        if (decl.parent?.nodes.length === 1) decl.parent?.remove()
        else decl.remove()
      }
    }
  }

  return root.toString()
}

export const removeUnusedKeyframes = (css: string) => {
  const root = postcss.parse(css)

  // Store all keyframes and their usage status
  const keyframes = new Map<string, boolean>()

  root.walk((node) => {
    if (node.type === 'atrule' && node.name === 'keyframes') {
      // Record the keyframe and mark it as unused
      keyframes.set(node.params, false)
    } else if (node.type === 'decl') {
      const decl = node
      const animationName =
        decl.prop === 'animation' ? decl.value.split(' ')[0] : decl.value

      if (!animationName) {
        return
      }

      if (
        (decl.prop === 'animation' || decl.prop === 'animation-name') &&
        keyframes.has(animationName)
      ) {
        // Mark the keyframe as used
        keyframes.set(animationName, true)
      }
    }
  })

  // Remove unused keyframes
  root.walkAtRules('keyframes', (rule) => {
    if (keyframes.get(rule.params) === false) {
      rule.remove()
    }
  })

  return root.toString()
}
