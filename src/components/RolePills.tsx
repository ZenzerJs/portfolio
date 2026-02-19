"use client";

import { motion } from "framer-motion";

const roles = [
  "Software Engineering Intern",
  "Full-Stack Developer Intern",
  "Frontend Developer Intern",
  "ML / Software Intern",
];

export function RolePills() {
  return (
    <section className="pt-2 pb-12 px-4">
      <div className="max-w-3xl mx-auto flex flex-wrap items-center justify-center gap-4">
        {roles.map((role, i) => (
          <motion.span
            key={role}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.5, type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.08, y: -2 }}
            className="px-6 py-3 rounded-full bg-white/8 backdrop-blur-lg border border-white/15 text-white/90 text-sm font-medium shadow-[0_4px_20px_rgba(255,255,255,0.05)] hover:bg-white/12 hover:border-white/25 hover:shadow-[0_8px_30px_rgba(255,255,255,0.08)] transition-all duration-300 cursor-default"
          >
            {role}
          </motion.span>
        ))}
      </div>
    </section>
  );
}
