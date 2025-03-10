import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";
import "./globals.css";

import "@mantine/core/styles.css";

import type { Metadata } from "next";
import { Providers } from "~/components/providers";

export const metadata: Metadata = {
  title: "IDN-AREA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
