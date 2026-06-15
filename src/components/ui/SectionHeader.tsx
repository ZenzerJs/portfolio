type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  count?: number;
  countLabel?: string;
  eyebrow?: string;
};

export function SectionHeader({
  title,
  subtitle,
  count,
  countLabel = "items",
  eyebrow,
}: SectionHeaderProps) {
  const eyebrowText =
    eyebrow ?? (count != null ? `( ${count} ${countLabel} )` : undefined);

  return (
    <header className="section-header mb-10 sm:mb-12">
      {eyebrowText ? <p className="section-eyebrow">{eyebrowText}</p> : null}
      <h2 className="section-title">
        {title}
        <span className="section-title-slash">/</span>
      </h2>
      {subtitle ? <p className="section-subtitle">{subtitle}</p> : null}
    </header>
  );
}
