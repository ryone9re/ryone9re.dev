import NextDocument, { Html, Head, Main, NextScript, OriginProps } from 'next/document'

class Document extends NextDocument<OriginProps> {
  render(): JSX.Element {
    return (
      <Html lang='ja'>
        <Head>
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <body>
          <script> </script>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default Document
