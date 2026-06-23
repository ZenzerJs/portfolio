import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { GradientBackground } from "@/components/layout/GradientBackground";

export default function NotFound() {
  return (
    <div className="site-page relative flex min-h-screen items-center justify-center px-5">
      <GradientBackground interactive={false} />
      <div className="relative z-10 text-center">
        <p className="text-7xl font-bold text-accent/30 sm:text-8xl">404</p>
        <h1 className="mt-4 text-2xl font-semibold sm:text-3xl">Page not found</h1>
        <p className="mx-auto mt-3 max-w-sm text-muted">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/" className="btn-primary mt-8 inline-flex">
          <ArrowLeft size={16} />
          Back to home
        </Link>
      </div>
    </div>
  );
}
