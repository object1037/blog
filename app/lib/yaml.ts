const stripQuotes = (s: string): string => {
  if (
    (s.startsWith('"') && s.endsWith('"')) ||
    (s.startsWith("'") && s.endsWith("'"))
  ) {
    return s.slice(1, -1)
  }
  return s
}

export const parseYaml = (yaml: string) => {
  const result: Record<string, unknown> = {}
  const lines = yaml
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith('#'))

  let currentKey: string | undefined
  let arrayBuffer: string[] | undefined

  for (const line of lines) {
    if (line.startsWith('-')) {
      if (!currentKey || !arrayBuffer) {
        return {}
      }
      arrayBuffer.push(stripQuotes(line.slice(1).trim()))
    } else {
      const [key, rawValue] = line.split(':').map((s) => s.trim())
      if (!key) {
        return {}
      }
      if (!rawValue) {
        currentKey = key
        arrayBuffer = []
        result[key] = arrayBuffer
      } else {
        if (rawValue.startsWith('[') && rawValue.endsWith(']')) {
          result[key] = rawValue
            .slice(1, -1)
            .split(',')
            .map((v) => stripQuotes(v.trim()))
        } else {
          if (rawValue === 'true' || rawValue === 'false') {
            result[key] = rawValue === 'true'
          } else {
            result[key] = stripQuotes(rawValue)
          }
        }
        currentKey = undefined
        arrayBuffer = undefined
      }
    }
  }

  return result
}
