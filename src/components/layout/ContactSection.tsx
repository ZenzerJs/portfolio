import { links, profile } from "@/data/portfolio";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";

export function ContactSection() {
  return (
    <section id="contact" className="page-container pb-24 pt-14">
      <header className="mb-8">
        <p className="section-eyebrow">Let&apos;s connect</p>
        <h2 className="section-title">
          Contact
          <span className="section-title-slash">/</span>
        </h2>
        <p className="mt-3 max-w-xl text-muted">
          {profile.availability} — open to conversations about AI, full-stack, or IT ops.
        </p>
      </header>

      <div className="glass-card p-8 sm:p-10">
        <p className="paren-label">( Get in touch )</p>
        <p className="display-heading text-2xl sm:text-4xl">{profile.email}</p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href={`mailto:${profile.email}`} className="btn-primary">
            <Mail size={16} />
            Send email
          </a>
          <a
            href={links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            <Linkedin size={16} />
            LinkedIn
            <ArrowUpRight size={14} />
          </a>
          <a href={links.github} target="_blank" rel="noopener noreferrer" className="btn-ghost">
            <Github size={16} />
            GitHub
            <ArrowUpRight size={14} />
          </a>
        </div>

        <a
          href={links.resume}
          download="Jayden_Saha_Resume.pdf"
          className="mt-6 inline-flex text-sm text-accent hover:underline"
        >
          Download resume →
        </a>
      </div>
    </section>
  );
}
