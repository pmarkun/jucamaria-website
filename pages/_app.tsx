import type { AppProps } from "next/app";
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
  return (
    <main className={`${lora.variable} ${inter.variable}`}>
      <Component {...pageProps} />
    </main>
  );
}
