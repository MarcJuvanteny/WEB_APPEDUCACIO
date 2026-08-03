export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display text-[1.6rem] tracking-tight text-ink ${className}`}>
      SeJus
    </span>
  );
}
