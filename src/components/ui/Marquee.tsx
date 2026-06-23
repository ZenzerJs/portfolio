import { heroMarqueeItems } from "@/data/portfolio";

export function Marquee() {
  const items = [...heroMarqueeItems, ...heroMarqueeItems];

  return (
    <div className="marquee-wrap" aria-hidden="true">
      <div className="marquee-track">
        {items.map((item, index) => (
          <span key={`${item}-${index}`} className="marquee-item">
            {item}
            <span className="marquee-star" aria-hidden="true">
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
