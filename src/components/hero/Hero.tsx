"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { heroFocus, links, profile } from "@/data/portfolio";
import { Marquee } from "@/components/ui/Marquee";
import { BlurRevealText } from "@/components/ui/BlurRevealText";
import { Magnetic } from "@/components/ui/Magnetic";

const [firstName, lastName] = profile.name.split(" ");

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.65]);

  return (
    <section ref={sectionRef} id="top" className="hero-section pt-20 lg:pt-6">
      <Marquee />

      <motion.div
        className="page-container hero-inner pb-16 pt-10 sm:pb-20 sm:pt-14 lg:pt-16"
        style={{
          y: shouldReduceMotion ? 0 : heroY,
          opacity: shouldReduceMotion ? 1 : heroOpacity,
        }}
      >
        {profile.available ? (
          <motion.div
            className="badge-pill mb-6"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05, ease }}
          >
            <span className="badge-dot" aria-hidden="true" />
            {profile.availability}
          </motion.div>
        ) : null}

        <motion.p
          className="hero-kicker"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.12, ease }}
        >
          {profile.role}
        </motion.p>

        {/* Continuous blur reveal across headline */}
        <h1 className="hero-title">
          <BlurRevealText text={firstName} className="hero-title-line" delay={0.18} />
          <BlurRevealText
            text={lastName}
            className="hero-title-line hero-title-line--glow"
            delay={0.28}
          />
        </h1>

        <motion.p
          className="hero-tagline mt-6 max-w-2xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.55, ease }}
        >
          {profile.tagline}
        </motion.p>

        <motion.p
          className="hero-intro mt-4 max-w-2xl leading-relaxed text-muted"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.62, ease }}
        >
          {profile.intro}
        </motion.p>

        <motion.ul
          className="mt-7 flex flex-wrap gap-2.5"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.04, delayChildren: 0.7 } },
          }}
        >
          {heroFocus.map((item, i) => (
            <motion.li
              key={item}
              variants={{
                hidden: { opacity: 0, y: 8 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.3, ease },
                },
              }}
            >
              <span
                className={`chip ${
                  i % 3 === 0
                    ? "chip--teal"
                    : i % 3 === 1
                    ? "chip--violet"
                    : "chip--warm"
                }`}
              >
                {item}
              </span>
            </motion.li>
          ))}
        </motion.ul>

        <motion.div
          className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.85, ease }}
        >
          <Magnetic className="flex">
            <Link href="#works" className="btn-primary w-full sm:w-auto">
              Explore Systems & Projects
              <ArrowRight size={18} strokeWidth={2.5} />
            </Link>
          </Magnetic>
          <Magnetic className="flex">
            <a
              href={links.resume}
              download="Jayden_Saha_Resume.pdf"
              className="btn-ghost w-full sm:w-auto"
            >
              <Download size={18} strokeWidth={2.5} />
              Download Résumé
            </a>
          </Magnetic>
        </motion.div>
      </motion.div>
    </section>
  );
}
