import type { AppProps } from "next/app";
import { useEffect } from "react";
import { useLanguage, translateContent } from "@/lib/i18n";
import { Lora, Inter } from "next/font/google";
import "@/styles/globals.css";

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
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
