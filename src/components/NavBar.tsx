"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X, Github, Linkedin, Mail, FileText } from "lucide-react";
import Link from "next/link";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
];

const socials = [
  {
    name: "GitHub",
    href: "https://github.com/ZenzerJs",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/jayden-saha/",
    icon: Linkedin,
  },
  {
    name: "Email",
    href: "mailto:Jaydensaha@yahoo.com",
    icon: Mail,
  },
];

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const timer = setTimeout(() => setHasLoaded(true), 100);

    const controlNavbar = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 50) {
        if (
          currentScrollY > lastScrollY.current &&
          currentScrollY - lastScrollY.current > 5
        ) {
          setIsVisible(false);
        } else if (lastScrollY.current - currentScrollY > 5) {
          setIsVisible(true);
        }
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", controlNavbar, { passive: true });

    return () => {
      window.removeEventListener("scroll", controlNavbar);
      clearTimeout(timer);
    };
  }, []);

  return (
    <nav
      className={`fixed top-4 md:top-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "-translate-y-20 md:-translate-y-24 opacity-0"
      } ${
        hasLoaded
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4"
      }`}
      style={{
        transition: hasLoaded
          ? "all 0.5s ease-out"
          : "opacity 0.8s ease-out, transform 0.8s ease-out",
      }}
    >
      {/* Desktop + Mobile: main pill */}
      <div className="w-[90vw] max-w-xs md:max-w-3xl mx-auto">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-3 md:px-6 md:py-2.5">
          <div className="flex items-center justify-between">
            {/* Logo / Name */}
            <Link
              href="/"
              className="flex items-center gap-2 hover:scale-105 transition-transform duration-200"
            >
              <span className="text-sm md:text-base font-semibold text-white tracking-tight">
                Jayden Saha
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-white/80 hover:text-white hover:scale-105 transition-all duration-200 text-sm font-medium"
                >
                  {item.name}
                </Link>
              ))}

              <div className="h-4 w-px bg-white/20" />

              {socials.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white hover:scale-110 transition-all duration-200"
                  aria-label={item.name}
                >
                  <item.icon size={16} />
                </a>
              ))}

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white hover:bg-gray-50 text-black font-medium px-4 py-1.5 rounded-full flex items-center gap-1.5 text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <FileText size={14} />
                Resume
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-white hover:scale-110 transition-transform duration-200"
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <Menu
                  size={24}
                  className={`absolute inset-0 transition-all duration-300 ${
                    isOpen
                      ? "opacity-0 rotate-180 scale-75"
                      : "opacity-100 rotate-0 scale-100"
                  }`}
                />
                <X
                  size={24}
                  className={`absolute inset-0 transition-all duration-300 ${
                    isOpen
                      ? "opacity-100 rotate-0 scale-100"
                      : "opacity-0 -rotate-180 scale-75"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div className="md:hidden relative">
        <div
          className={`fixed inset-0 bg-black/20 backdrop-blur-sm transition-all duration-300 ${
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsOpen(false)}
          style={{ zIndex: -1 }}
        />

        <div
          className={`mt-2 w-[90vw] max-w-xs mx-auto transition-all duration-500 ease-out ${
            isOpen
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 -translate-y-8 scale-95 pointer-events-none"
          }`}
        >
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-2xl">
            <div className="flex flex-col gap-1">
              {navigation.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-white/80 hover:text-white hover:bg-white/10 rounded-lg px-3 py-3 text-left transition-all duration-300 font-medium hover:translate-x-1 ${
                    isOpen ? "animate-mobile-menu-item" : ""
                  }`}
                  style={{
                    animationDelay: isOpen
                      ? `${index * 80 + 100}ms`
                      : "0ms",
                  }}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              <div className="h-px bg-white/10 my-2" />

              <div className="flex items-center gap-4 px-3 py-2">
                {socials.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-white transition-colors duration-200"
                    aria-label={item.name}
                  >
                    <item.icon size={20} />
                  </a>
                ))}
              </div>

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={`bg-white hover:bg-gray-50 text-black font-medium px-6 py-3 rounded-full flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-lg mt-1 ${
                  isOpen ? "animate-mobile-menu-item" : ""
                }`}
                style={{
                  animationDelay: isOpen
                    ? `${navigation.length * 80 + 150}ms`
                    : "0ms",
                }}
              >
                <FileText size={16} />
                Resume
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
