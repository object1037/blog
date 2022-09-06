import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html
        lang="ja"
        className="h-full flex flex-col text-ngray-900 dark:text-ngray-100 bg-white dark:bg-ngray-900"
      >
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@400;500;700&display=optional"
            rel="stylesheet"
          />
        </Head>
        <body className="h-full">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
