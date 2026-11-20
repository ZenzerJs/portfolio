import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FolderOpen } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { SidebarNav } from "@/components/layout/SidebarNav";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you are looking for does not exist.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="site-page">
      <SidebarNav />

      <div className="site-shell">
        <main
          id="main-content"
          className="flex flex-1 flex-col items-center justify-center px-5 pb-16 pt-24 lg:pt-12"
        >
          <div className="text-center">
            <p className="font-mono text-6xl font-medium tabular-nums text-accent sm:text-7xl">
              404
            </p>
            <h1 className="mt-4 text-2xl font-semibold text-foreground sm:text-3xl">
              Page not found
            </h1>
            <p className="mx-auto mt-3 max-w-sm text-base text-muted">
              The page you&apos;re looking for doesn&apos;t exist or has been
              moved.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/" className="btn-primary inline-flex">
                <ArrowLeft size={16} aria-hidden="true" />
                <span>Back to home</span>
              </Link>
              <Link href="/projects" className="btn-secondary inline-flex">
                <FolderOpen size={16} aria-hidden="true" />
                <span>Browse projects</span>
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
