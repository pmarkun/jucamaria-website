import type { AppProps } from "next/app";
import { useEffect } from "react";
import { useLanguage, translateContent } from "@/lib/i18n";
import localFont from "next/font/local";
import "@/styles/globals.css";

const lora = localFont({
  src: "../public/fonts/lora-latin.woff2",
  weight: "400 700",
  variable: "--font-lora",
  display: "swap",
});

const inter = localFont({
  src: "../public/fonts/inter-latin.woff2",
  weight: "100 900",
  variable: "--font-inter",
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  const { language } = useLanguage();
  useEffect(() => {
    document.documentElement.lang = language === "en" ? "en" : "pt-BR";
  }, [language]);
  return (
    <main className={`${lora.variable} ${inter.variable}`}>
      <Component key={language} {...translateContent(pageProps, language)} />
    </main>
  );
}
