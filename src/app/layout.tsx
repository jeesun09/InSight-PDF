import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Provider from "@/components/Provider";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://localhost:3000"),
  title: {
    default: "InSight-PDF",
    template: "%s - InSight-PDF",
  },
  description: "Unlock the Power of Your PDFs with AI-Driven Insights.",
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
    url: "https://localhost:3000",
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
  // Robots directives
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Format detection
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
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
            <Footer />
            <Toaster />
          </body>
        </html>
      </Provider>
    </ClerkProvider>
  );
}
