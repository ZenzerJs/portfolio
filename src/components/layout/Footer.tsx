export function Footer() {
  return (
    <footer className="page-container border-t border-[var(--panel-border)] py-8">
      <p className="text-center text-xs text-muted">
        © {new Date().getFullYear()} Jayden Saha · Built with Next.js
      </p>
    </footer>
  );
}
