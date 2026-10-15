import { useLanguage } from "@/lib/i18n";
import Head from "next/head";
import { useRouter } from "next/router";
import { localizedPath } from "@/lib/i18n";
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
  const { t, language } = useLanguage();
  const router = useRouter();
  const pageTitle = title ? `${title} | Juca Maria` : t(SITE_NAME);
  const pageDesc = description || t(DEFAULT_DESC);
  const pageImage = image || `${router.basePath}/og-image.jpg`;
  const pagePath = router.asPath.split(/[?#]/)[0];

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:image" content={pageImage} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content={language === "en" ? "en_US" : "pt_BR"} />
        <link rel="alternate" hrefLang="pt-BR" href={`${router.basePath}${localizedPath(pagePath, "pt")}`} />
        <link rel="alternate" hrefLang="en" href={`${router.basePath}${localizedPath(pagePath, "en")}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={`${router.basePath}/favicon.ico`} />
      </Head>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </>
  );
}
