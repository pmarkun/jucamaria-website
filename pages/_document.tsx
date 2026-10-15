import Document, { Html, Head, Main, NextScript, type DocumentContext } from "next/document";
import { languageFromPath } from "@/lib/i18n";

export default class SiteDocument extends Document<{ language: string }> {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps, language: languageFromPath(ctx.pathname) === "en" ? "en" : "pt-BR" };
  }

  render() {
    return (
      <Html lang={this.props.language}>
        <Head />
        <body><Main /><NextScript /></body>
      </Html>
    );
  }
}
