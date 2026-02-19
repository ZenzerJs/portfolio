"use client";

import { motion } from "framer-motion";
import { Code2, Server, BrainCircuit } from "lucide-react";
import type { ReactNode } from "react";

interface SkillGroup {
  title: string;
  icon: ReactNode;
  skills: string[];
}

const skillGroups: SkillGroup[] = [
  {
    title: "Frontend & Mobile",
    icon: <Code2 size={20} />,
    skills: [
      "HTML5 & CSS3",
      "JavaScript",
      "React / Next.js",
      "React Native",
      "Tailwind CSS",
      "Swift & Xcode",
      "Responsive Design",
      "Framer Motion",
    ],
  },
  {
    title: "Full-Stack & Tools",
    icon: <Server size={20} />,
    skills: [
      "Python",
      "Java",
      "C#",
      "TypeScript",
      "Node.js",
      "Firebase",
      "Git & GitHub",
      "Linux",
      "REST APIs",
    ],
  },
  {
    title: "ML & AI",
    icon: <BrainCircuit size={20} />,
    skills: [
      "Reinforcement Learning",
      "Neural Networks",
      "Python ML Libraries",
      "Data Analysis",
      "Reward System Design",
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const chipVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

export function SkillChips() {
  return (
    <section className="py-16 md:py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Skills &amp; Focus Areas
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            What I bring to the table — and what I&apos;m excited to keep building.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {skillGroups.map((group) => (
            <motion.div
              key={group.title}
              variants={cardVariants}
              className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 hover:border-primary/30 transition-colors duration-300"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  {group.icon}
                </div>
                <h3 className="text-lg font-semibold">{group.title}</h3>
              </div>

              <motion.div
                variants={containerVariants}
                className="flex flex-wrap gap-2"
              >
                {group.skills.map((skill, j) => (
                  <motion.span
                    key={skill}
                    variants={chipVariants}
                    transition={{ delay: j * 0.05 }}
                    whileHover={{ scale: 1.06, y: -1 }}
                    className="px-3.5 py-1.5 text-xs font-medium rounded-full bg-white/8 backdrop-blur-sm border border-white/10 text-secondary-foreground shadow-[0_2px_10px_rgba(255,255,255,0.03)] hover:bg-primary/15 hover:text-primary hover:border-primary/20 transition-all duration-200 cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
