import "@/styles/globals.css";
import type { AppProps } from "next/app";

import localFont from "next/font/local";

const mono = localFont({
  src: [
    {
      path: "fonts/SuisseIntlMono-Bold.otf",
      weight: "600",
      style: "bold",
    },
    {
      path: "fonts/SuisseIntlMono-Thin.otf",
      weight: "200",
      style: "thin",
    },
  ],
  variable: "--font-mono",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={mono.className}>
      <Component {...pageProps} />;
    </div>
  );
}
