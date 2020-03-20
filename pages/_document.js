import { HooksCacheScripts, withSsrHooks } from "../lib/useComputation";

import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <HooksCacheScripts />
          <NextScript />
        </body>
      </Html>
    );
  }
}

const __Doc = MyDocument; // use babel to transform this line

export default withSsrHooks(__Doc); // and add this line
