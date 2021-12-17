import { GetStaticProps } from 'next'
import getBundledMdx from '../../lib/getBundledMdx'
import ArticleLayout from '../../components/articleLayout'
import { getMDXComponent } from 'mdx-bundler/client'
import React from 'react'
import { getAllPostsPaths } from '../../utils/getAllPostsPaths'
import H2 from '../../components/mdComponents/H2'
import H3 from '../../components/mdComponents/H3'
import H4 from '../../components/mdComponents/H4'
import Paragraph from '../../components/mdComponents/Paragraph'
import Ul from '../../components/mdComponents/Ul'
import Ol from '../../components/mdComponents/Ol'
import Li from '../../components/mdComponents/Li'
import Anchor from '../../components/mdComponents/Anchor'
import Blockquote from '../../components/mdComponents/Blockquote'
import Im from "../../components/im"
import Note, { noteProps } from '../../components/note'
import generateSearchIndex from '../../lib/generateSearchIndex'

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const bundledMdx = await getBundledMdx(params!.date as string)

  const code = bundledMdx.code
  const frontmatter = bundledMdx.frontmatter
  const plaintext = bundledMdx.plaintext

  if (process.env.NODE_ENV === 'production') {
    generateSearchIndex({ plaintext, frontmatter })
  }

  return {
    props: {
      code,
      frontmatter
    }
  }
}

export async function getStaticPaths() {
  const allPostsPaths = getAllPostsPaths()
  return {
    paths: allPostsPaths.map((path) => ({ params: { date: path } })),
    fallback: false
  };
}

const defaultNoteStyle = "my-8"
const mdComponents = {
  h1: H2, 
  h2: H3,
  h3: H4,
  p: Paragraph,
  ul: Ul,
  ol: Ol,
  li: Li,
  a: Anchor,
  blockquote: Blockquote,
  Im,
  Note: ({
    children,
    className = defaultNoteStyle,
    type
  }: noteProps) => Note({
    children,
    className,
    type
  }),
}

export default function Post({
  code,
  frontmatter
}: {
  code: string
  frontmatter: postData
}) {
  const Contents = React.useMemo(() => getMDXComponent(code), [code])
  return (
    <>
    <ArticleLayout meta={frontmatter}>
      <Contents components={mdComponents as any} />
    </ArticleLayout>
    </>
  )
}