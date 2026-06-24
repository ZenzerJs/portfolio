import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FolderOpen } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { GradientBackground } from "@/components/layout/GradientBackground";
import { SidebarNav } from "@/components/layout/SidebarNav";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you are looking for does not exist.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="site-page">
      <GradientBackground interactive={false} />
      <SidebarNav />

      <main id="main-content" className="site-main flex min-h-screen flex-col items-center justify-center px-5 pb-16 pt-24 lg:pt-10">
        <div className="text-center">
          <p className="text-7xl font-bold text-accent/30 sm:text-8xl">404</p>
          <h1 className="mt-4 text-2xl font-semibold sm:text-3xl">Page not found</h1>
          <p className="mx-auto mt-3 max-w-sm text-muted">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/" className="btn-primary inline-flex">
              <ArrowLeft size={16} />
              Back to home
            </Link>
            <Link href="/projects" className="btn-ghost inline-flex">
              <FolderOpen size={16} />
              Browse projects
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
}
