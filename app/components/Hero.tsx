import type { ReactNode } from "react";

interface HeroProps {
  title: string;
  subtitle: string;
  children?: ReactNode;
}

export function Hero({ title, subtitle, children }: HeroProps) {
  return (
    <section className="hero">
      <h1>{title}</h1>
      <p className="subtitle">{subtitle}</p>
      <hr className="hero-divider" />
      {children}
    </section>
  );
}
