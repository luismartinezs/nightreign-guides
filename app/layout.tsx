import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { metadata as meta } from "@/shared/metadata";
import { Header } from "@/shared/components/header/Header";
import { Footer } from "@/shared/components/footer/Footer";
import { FixedBottomRightStack } from "@/shared/components/FixedBottomRightStack";
import { FeaturebaseFeedbackLink } from "@/shared/components/FeaturebaseFeedbackLink";
import { AutoScrollButton } from "@/shared/components/auto-scroll-button";

export const metadata: Metadata = {
  title: meta.name,
  description: meta.description,
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="apple-mobile-web-app-title"
          content={meta.name}
        />
      </head>
      <body
        className={`${inter.className} antialiased`}
      >
        <div className="relative isolate flex h-full min-h-screen flex-col justify-between">
          <div>
            <Header className="sticky top-0 z-30" />
          </div>
          <main className="relative isolate h-full flex-1 flex flex-col">
            {children}
          </main>
          <Footer />
          <FixedBottomRightStack>
            <FeaturebaseFeedbackLink />
            <AutoScrollButton />
          </FixedBottomRightStack>
        </div>
      </body>
    </html>
  );
}
