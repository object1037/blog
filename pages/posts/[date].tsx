import type { ReactElement } from 'react'
import { GetStaticProps } from 'next'
import getBundledMdx from '../../lib/getBundledMdx'
import Layout from '../../components/layout'
import ArticleLayout from '../../components/articleLayout'
import { getMDXComponent } from 'mdx-bundler/client'
import React from 'react'
import { getAllPostsPaths } from '../../utils/getAllPostsPaths'
import { H2, H3, H4, Paragraph, Ul, Ol, Li, Anchor, Blockquote, Pre, Table } from '../../components/mdComponents'
import Im from "../../components/im"
import Note, { noteProps } from '../../components/note'
import generateSearchIndex from '../../lib/generateSearchIndex'

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const bundledMdx = await getBundledMdx(params!.date as string)

  const code = bundledMdx.code
  const frontmatter = bundledMdx.frontmatter
  const plaintext = bundledMdx.plaintext

  if (process.env.VERCEL_ENV) {
    if (process.env.VERCEL_ENV === 'production') {
      generateSearchIndex({ plaintext, frontmatter })
    }
  } else {
    if (process.env.NODE_ENV === 'production') {
      generateSearchIndex({ plaintext, frontmatter })
    }
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
  pre: Pre,
  table: Table,
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

export default function Page({
  code
}: {
  code: string
}) {
  const Contents = React.useMemo(() => getMDXComponent(code), [code])
  return (
    <Contents components={mdComponents as any} />
  )
}

Page.getLayout = function getLayout({
  page,
  frontmatter
}: {
  page: ReactElement,
  frontmatter: postData
}) {
  return (
    <Layout meta={frontmatter}>
      <ArticleLayout meta={frontmatter}>
        {page}
      </ArticleLayout>
    </Layout>
  )
}