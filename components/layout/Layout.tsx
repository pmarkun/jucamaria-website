import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  image?: string;
}

const SITE_NAME = "Juca Maria — Cultura, Arte e Educação";
const DEFAULT_DESC =
  "Laboratórios de arte, cultura e tecnologia que criam presença no mundo. Residências, oficinas e projetos territoriais em rede.";

export default function Layout({
  children,
  title,
  description,
  image,
}: LayoutProps) {
  const pageTitle = title ? `${title} | Juca Maria` : SITE_NAME;
  const pageDesc = description || DEFAULT_DESC;
  const pageImage = image || "/og-image.jpg";

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:image" content={pageImage} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </>
  );
}
