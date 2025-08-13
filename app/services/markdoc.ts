import Markdoc, { type ValidateError } from '@markdoc/markdoc'
import * as v from 'valibot'
import { type FrontMatter, parseFrontmatter } from './db'

type ParsedResult =
  | { success: false; errors: ValidateError[] | 'Bad Frontmatter' }
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
  if (errors.length > 0) {
    return {
      success: false,
      errors,
    }
  }
  const result = v.safeParse(parseFrontmatter, ast.attributes.frontmatter)
  if (!result.success) {
    console.log(result.issues)
    return {
      success: false,
      errors: 'Bad Frontmatter',
    }
  }

  return {
    success: true,
    frontmatter: result.output,
  }
}
