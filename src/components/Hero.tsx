"use client";

import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";

export function Hero() {
  return (
    <section className="min-h-[85vh] sm:min-h-screen flex items-center justify-center px-5 sm:px-6 py-20 relative">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/8 backdrop-blur-lg border border-white/15 text-white text-xs sm:text-sm font-medium mb-6 sm:mb-8 mt-16 sm:mt-12 shadow-[0_4px_20px_rgba(255,255,255,0.05)] animate-fade-in-badge">
          <span className="w-2 h-2 bg-primary rounded-full mr-2.5 animate-pulse" />
          Seeking 2026 Summer Internships
        </div>

        {/* Main heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-balance mb-6 animate-fade-in-heading">
          <span className="text-foreground">Jayden Saha</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl md:text-2xl text-white/80 text-balance max-w-2xl mx-auto mb-4 leading-relaxed font-light animate-fade-in-subheading">
          CS + Business Management Option @ Laurier
        </p>
        <p className="text-base sm:text-lg text-white/60 max-w-xl mx-auto mb-10 leading-relaxed animate-fade-in-subheading">
          Full-Stack Developer &middot; ML Enthusiast
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 animate-fade-in-buttons w-full sm:w-auto px-2 sm:px-0">
          <Link
            href="/projects"
            className="w-full sm:w-auto bg-white text-black rounded-full px-8 py-3.5 text-base font-medium transition-all duration-300 hover:bg-gray-50 hover:scale-105 hover:shadow-lg inline-flex items-center justify-center gap-2 group"
          >
            View Projects
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>

          <a
            href="/resume.pdf"
            download="Jayden_Saha_Resume.pdf"
            className="w-full sm:w-auto rounded-full px-8 py-3.5 text-base font-medium border border-white/20 hover:bg-white/10 transition-all duration-200 hover:scale-105 inline-flex items-center justify-center gap-2 text-white"
          >
            <Download size={18} />
            Download Resume
          </a>
        </div>
      </div>
    </section>
  );
}
