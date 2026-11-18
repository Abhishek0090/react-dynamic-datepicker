import type { Metadata } from "next";
import "react-dynamic-datepicker/styles.css";
import "./globals.css";
import { ThemeProvider } from "./theme";
import { THEME_STORAGE_KEY } from "./theme-key";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://react-dynamic-datepicker.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "React Dynamic Datepicker - React calendar and date picker demo",
  description:
    "Live demo of react-dynamic-datepicker: a React calendar and date picker with week, month and year views, event lists, a date input popover, themes and dark mode.",
  keywords: [
    "react datepicker",
    "react date picker",
    "react calendar",
    "react event calendar",
    "nextjs datepicker",
    "react-dynamic-datepicker",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "React Dynamic Datepicker",
    description: "React calendar and date picker with week, month and year views, events, themes and dark mode.",
    url: "/",
    type: "website",
  },
};

// Runs before first paint so a saved dark choice doesn't flash light. Default is light.
const themeScript = `try{if(localStorage.getItem("${THEME_STORAGE_KEY}")==="dark")document.documentElement.dataset.theme="dark"}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
