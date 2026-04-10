import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hotel Sai Darshan Review Assistant | Write Reviews in 10 Seconds",
  description: "Create authentic, natural reviews for Hotel Sai Darshan Rajpipla. Smart review generator helps guests share their experience near Harshiddhi Mata Temple. Fast, easy, and SEO-friendly.",
  keywords: [
    "hotel in Rajpipla",
    "Hotel Sai Darshan",
    "hotel near Harshiddhi Mata Temple",
    "best hotel Rajpipla",
    "budget hotel Rajpipla",
    "Rajpipla accommodation",
    "hotel review generator",
    "Google reviews Rajpipla"
  ],
  authors: [{ name: "Hotel Sai Darshan" }],
  creator: "Hotel Sai Darshan",
  publisher: "Hotel Sai Darshan",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://hotelsaidarshanreviews.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Hotel Sai Darshan Review Assistant",
    description: "Write authentic reviews for Hotel Sai Darshan Rajpipla in 10 seconds",
    url: 'https://hotelsaidarshanreviews.vercel.app',
    siteName: 'Hotel Sai Darshan Reviews',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hotel Sai Darshan Review Assistant',
    description: 'Create authentic reviews for Hotel Sai Darshan Rajpipla',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
