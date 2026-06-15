import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { heroFocus, links, profile } from "@/data/portfolio";
import { Marquee } from "@/components/ui/Marquee";

const [firstName, lastName] = profile.name.split(" ");

export function Hero() {
  return (
    <section id="top" className="hero-section pt-20 lg:pt-6">
      <Marquee />

      <div className="page-container hero-inner pb-20 pt-14 sm:pb-24 sm:pt-20">
        <div className="fade-up">
          {profile.available ? (
            <div className="badge-pill mb-8">
              <span className="badge-dot" aria-hidden="true" />
              Available for work
            </div>
          ) : null}

          <p className="hero-kicker">{profile.role}</p>

          <h1 className="hero-title">
            <span className="hero-title-line">{firstName}</span>
            <span className="hero-title-line hero-title-line--glow">{lastName}</span>
          </h1>

          <p className="hero-tagline mt-6 max-w-2xl">{profile.tagline}</p>

          <p className="hero-intro mt-5 max-w-xl">{profile.intro}</p>

          <ul className="mt-8 flex flex-wrap gap-2.5">
            {heroFocus.map((item, i) => (
              <li key={item}>
                <span className={`chip ${i % 3 === 0 ? "chip--teal" : i % 3 === 1 ? "chip--violet" : "chip--warm"}`}>
                  {item}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="#works" className="btn-primary">
              View projects
              <ArrowRight size={18} strokeWidth={2.5} />
            </Link>
            <a href={links.resume} download="Jayden_Saha_Resume.pdf" className="btn-ghost">
              <Download size={18} strokeWidth={2.5} />
              Download resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
