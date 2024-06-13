// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="pt-br">
        <Head>
        <link rel="shortcut icon" href="https://www.claro.com.br/favicon.ico"></link>
          {/* Reset CSS */}
          <link rel="stylesheet" href="https://mondrian.claro.com.br/vanilla/reset.css" />
          {/* Tokens CSS */}
          <link rel="stylesheet" href="https://mondrian.claro.com.br/tokens/claro-tokens-latest.custom-properties.css" />
          {/* Mondrian Vanilla CSS */}
          <link rel="stylesheet" href="https://mondrian.claro.com.br/vanilla/pre-release/6_0_0/mondrian-vanilla-latest.css" />
          {/* Google Tag Manager */}
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-TGL644T');`,
            }}
          />
          {/* Coloque aqui outros recursos globais que deseja carregar */}
        </Head>
        <body>
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-TGL644T"
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            ></iframe>
          </noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
