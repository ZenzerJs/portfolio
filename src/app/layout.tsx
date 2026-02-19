import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Jayden Saha — Portfolio",
    template: "%s | Jayden Saha",
  },
  description:
    "CS + Business Management @ Laurier · Full-Stack Developer · ML Enthusiast. A recruiter-optimized portfolio with projects and demos.",
  openGraph: {
    title: "Jayden Saha — Portfolio",
    description:
      "CS + Business Management @ Laurier · Full-Stack Developer · ML Enthusiast.",
    type: "website",
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jayden Saha — Portfolio",
    description:
      "CS + Business Management @ Laurier · Full-Stack Developer · ML Enthusiast.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground`}
      >
        <NavBar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
