"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import type { ReactNode } from "react";

const footerLinks = [
  {
    label: "Navigation",
    links: [
      { title: "Home", href: "/" },
      { title: "Projects", href: "/projects" },
    ],
  },
  {
    label: "Connect",
    links: [
      {
        title: "GitHub",
        href: "https://github.com/ZenzerJs",
        icon: Github,
      },
      {
        title: "LinkedIn",
        href: "https://www.linkedin.com/in/jayden-saha/",
        icon: Linkedin,
      },
      { title: "Email", href: "mailto:Jaydensaha@yahoo.com", icon: Mail },
    ],
  },
  {
    label: "Resources",
    links: [
      { title: "Resume", href: "/resume.pdf" },
    ],
  },
];

function AnimatedContainer({
  className,
  delay = 0.1,
  children,
}: {
  className?: string;
  delay?: number;
  children: ReactNode;
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ filter: "blur(4px)", translateY: -8, opacity: 0 }}
      whileInView={{ filter: "blur(0px)", translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Footer() {
  return (
    <footer className="relative w-full max-w-6xl mx-auto flex flex-col items-center justify-center rounded-t-[3rem] border-t border-border bg-[radial-gradient(35%_128px_at_50%_0%,rgba(255,255,255,0.06),transparent)] px-6 py-12 lg:py-16">
      <div className="bg-foreground/20 absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur" />

      <div className="grid w-full gap-8 xl:grid-cols-3 xl:gap-8">
        <AnimatedContainer className="space-y-4">
          <h2 className="text-lg font-semibold tracking-tight">
            Jayden Saha
          </h2>
          <p className="text-muted-foreground text-sm max-w-xs">
            CS + Business Management @ Laurier. Full-Stack Developer &amp; ML
            Enthusiast.
          </p>
          <div className="text-muted-foreground text-sm hidden md:block">
            <p>&copy; {new Date().getFullYear()} Jayden Saha. All rights reserved.</p>
          </div>
        </AnimatedContainer>

        <div className="mt-6 grid grid-cols-2 gap-8 md:grid-cols-3 xl:col-span-2 xl:mt-0">
          {footerLinks.map((section, index) => (
            <AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
              <div className="mb-10 md:mb-0">
                <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {section.label}
                </h3>
                <ul className="text-muted-foreground mt-4 space-y-2 text-sm">
                  {section.links.map((link) => (
                    <li key={link.title}>
                      <a
                        href={link.href}
                        target={
                          link.href.startsWith("http") ||
                          link.href.startsWith("mailto")
                            ? "_blank"
                            : undefined
                        }
                        rel={
                          link.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="hover:text-foreground inline-flex items-center gap-1.5 transition-all duration-300"
                      >
                        {"icon" in link && link.icon && (
                          <link.icon className="size-3.5" />
                        )}
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedContainer>
          ))}
        </div>
      </div>

      <div className="md:hidden mt-8 text-center">
        <p className="text-muted-foreground text-sm">
          &copy; {new Date().getFullYear()} Jayden Saha. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
