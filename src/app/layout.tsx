import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Provider from "@/components/Provider";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://insight-pdf.vercel.app/"),
  title: {
    default: "InSight PDF",
    template: "%s - InSight PDF",
  },
  description:
    "Unlock the Power of Your PDFs with AI-Driven Insights - Chat with PDF, Enhance Productivity, and Boost Efficiency.",
  applicationName: "InSight PDF",
  authors: [
    { name: "Jeesun Bari", url: "https://www.linkedin.com/in/jeesun30/" },
  ],
  keywords: [
    "PDF",
    "AI",
    "Insights",
    "Chat",
    "Chatbot",
    "PDF Chatbot",
    "document analysis",
    "AI-driven insights",
    "interact with PDFs",
    "Chat with PDF",
  ],

  //icons
  icons: {
    icon: "/favicon.ico",
    shortcut: "/images/favicon-16x16.png",
    apple: "/images/apple-icon.png",
  },

  openGraph: {
    title: "InSight PDF - Chat with Your PDFs Using AI",
    description:
      "Unlock the power of your PDFs with InSight PDF, an AI-driven platform that lets you interact with your documents effortlessly. Get insights and answers from your PDFs like never before.",
    url: "https://insight-pdf.vercel.app/",
    siteName: "InSight PDF",
    images: [
      {
        url: "/images/insight-pdf.png",
        width: 1200,
        height: 630,
        alt: "InSight PDF - Chat with Your PDFs Using AI",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "InSight PDF - Chat with Your PDFs Using AI",
    description:
      "Unlock the power of your PDFs with InSight PDF, an AI-driven platform that lets you interact with your documents effortlessly. Get insights and answers from your PDFs like never before.",
    creator: "@JeesunSk",
    images: [
      {
        url: "/images/insight-pdf.png",
        width: 1200,
        height: 630,
        alt: "InSight PDF - Chat with Your PDFs Using AI",
      },
    ],
  },
  appleWebApp: {
    capable: true,
    title: "InSight PDF",
    statusBarStyle: "black-translucent",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <Provider>
        <html lang="en">
          <body className={inter.className}>
            {children}
            <Toaster />
          </body>
        </html>
      </Provider>
    </ClerkProvider>
  );
}
