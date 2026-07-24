"use client";

import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { motion } from "motion/react";
import { heroFocus, links, profile } from "@/data/portfolio";
import { Marquee } from "@/components/ui/Marquee";

const [firstName, lastName] = profile.name.split(" ");

/* Shared ease — snappy deceleration */
const ease = [0.25, 0.46, 0.45, 0.94] as const;

export function Hero() {
  return (
    <section id="top" className="hero-section pt-20 lg:pt-6">
      <Marquee />

      <div className="page-container hero-inner pb-20 pt-14 sm:pb-24 sm:pt-20">
        {/* ── Availability Badge ── */}
        {profile.available ? (
          <motion.div
            className="badge-pill mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1, ease }}
          >
            <span className="badge-dot" aria-hidden="true" />
            {profile.availability}
          </motion.div>
        ) : null}

        {/* ── Role Kicker ── */}
        <motion.p
          className="hero-kicker"
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.2, ease }}
        >
          {profile.role}
        </motion.p>

        {/* ── Title: First + Last name ── */}
        <h1 className="hero-title">
          <motion.span
            className="hero-title-line"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease }}
          >
            {firstName}
          </motion.span>
          <motion.span
            className="hero-title-line hero-title-line--glow"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.38, ease }}
          >
            {lastName}
          </motion.span>
        </h1>

        {/* ── Tagline ── */}
        <motion.p
          className="hero-tagline mt-6 max-w-2xl"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.5, ease }}
        >
          {profile.tagline}
        </motion.p>

        {/* ── Intro ── */}
        <motion.p
          className="hero-intro mt-5 max-w-xl"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.58, ease }}
        >
          {profile.intro}
        </motion.p>

        {/* ── Focus Chips (staggered) ── */}
        <motion.ul
          className="mt-8 flex flex-wrap gap-2.5"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.05, delayChildren: 0.68 } },
          }}
        >
          {heroFocus.map((item, i) => (
            <motion.li
              key={item}
              variants={{
                hidden: { opacity: 0, y: 10, scale: 0.92 },
                show: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.35, ease },
                },
              }}
            >
              <span
                className={`chip ${i % 3 === 0 ? "chip--teal" : i % 3 === 1 ? "chip--violet" : "chip--warm"}`}
              >
                {item}
              </span>
            </motion.li>
          ))}
        </motion.ul>

        {/* ── Action Buttons ── */}
        <motion.div
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.9, ease }}
        >
          <Link href="#works" className="btn-primary">
            View projects
            <ArrowRight size={18} strokeWidth={2.5} />
          </Link>
          <a href={links.resume} download="Jayden_Saha_Resume.pdf" className="btn-ghost">
            <Download size={18} strokeWidth={2.5} />
            Download resume
          </a>
        </motion.div>
      </div>
    </section>
  );
}
