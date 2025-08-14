import Markdoc, { type ValidateError } from '@markdoc/markdoc'
import * as v from 'valibot'
import { type FrontMatter, parseFrontmatter } from './db'

type ParsedResult =
  | { success: false; errors: ValidateError[] }
  | { success: true; frontmatter: FrontMatter }

export const markdownToHtml = (markdown: string) => {
  const ast = Markdoc.parse(markdown)
  const content = Markdoc.transform(ast)
  const html = Markdoc.renderers.html(content)
  return html
}

export const parseMarkdown = (markdown: string): ParsedResult => {
  const ast = Markdoc.parse(markdown)
  const errors = Markdoc.validate(ast)
  const result = v.safeParse(parseFrontmatter, ast.attributes.frontmatter)
  if (!result.success) {
    errors.push({
      type: 'frontmatter',
      lines: [1],
      error: {
        id: 'bad-frontmatter',
        level: 'critical',
        message: 'Bad Frontmatter',
      },
    })

    return {
      success: false,
      errors,
    }
  }

  return {
    success: true,
    frontmatter: result.output,
  }
}
