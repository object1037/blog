import Markdoc, { type ValidateError } from '@markdoc/markdoc'

export const markdownToHtml = (markdown: string) => {
  const ast = Markdoc.parse(markdown)
  const content = Markdoc.transform(ast)
  const html = Markdoc.renderers.html(content)
  return html
}

export const parseMarkdown = (
  markdown: string,
):
  | { success: false; errors: ValidateError[] }
  | { success: true; frontmatter: any } => {
  const ast = Markdoc.parse(markdown)
  const errors = Markdoc.validate(ast)
  if (errors.length > 0) {
    return {
      success: false,
      errors,
    }
  }
  const frontmatter = ast.attributes.frontmatter
  return {
    success: true,
    frontmatter,
  }
}
