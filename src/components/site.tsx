import { useState } from "react";
import type { ReactNode, SelectHTMLAttributes } from "react";
import { Link } from "@tanstack/react-router";
import { site } from "../config";

/* ── primitives ─────────────────────────────────────────────────────── */

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1200px] px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full bg-brand-soft px-3.5 py-1.5 text-[13px] font-semibold text-brand-ink ${className}`}
    >
      {children}
    </span>
  );
}

export function Button({
  children,
  to,
  href,
  variant = "solid",
  className = "",
}: {
  children: ReactNode;
  to?: string;
  href?: string;
  variant?: "solid" | "ghost";
  className?: string;
}) {
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-semibold transition-all duration-300";
  const styles =
    variant === "solid"
      ? "bg-brand text-white shadow-[0_10px_24px_-10px_rgba(37,99,235,0.7)] hover:bg-brand-ink hover:-translate-y-0.5"
      : "bg-white text-navy border border-line hover:border-brand hover:text-brand hover:-translate-y-0.5";
  const cls = `${base} ${styles} ${className}`;
  const inner = (
    <>
      {children}
      <span className="transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </>
  );
  if (to)
    return (
      <Link to={to} className={cls}>
        {inner}
      </Link>
    );
  return (
    <a href={href} className={cls}>
      {inner}
    </a>
  );
}

/* ── icons ──────────────────────────────────────────────────────────── */

const I = {
  wrench:
    "M14.7 6.3a4 4 0 0 0-5 5L4 17l3 3 5.7-5.7a4 4 0 0 0 5-5l-2.5 2.5-2.1-.4-.4-2.1z",
  gauge: "M12 13l4-3M5.6 18a9 9 0 1 1 12.8 0M9 21h6",
  spray:
    "M9 7V4h2v3M9 7h2a3 3 0 0 1 3 3v9a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-9a3 3 0 0 1 3-3zM16 5h2M16 8h2M16 11h2",
  tire: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm0 4a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 0V3m0 18v-4m5-5h4M3 12h4",
  clipboard:
    "M9 4h6a1 1 0 0 1 1 1v1h2v15H6V6h2V5a1 1 0 0 1 1-1zm0 0a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2M9 12h6M9 16h4",
  gear: "M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm9 3-2.1-.6-.5-1.3 1-1.9-1.7-1.7-1.9 1-1.3-.5L13 3h-2l-.6 2.1-1.3.5-1.9-1L5.5 6.3l1 1.9-.5 1.3L3 11v2l2.1.6.5 1.3-1 1.9 1.7 1.7 1.9-1 1.3.5.6 2.1h2l.6-2.1 1.3-.5 1.9 1 1.7-1.7-1-1.9.5-1.3z",
  phone:
    "M5 4h3l2 5-2 1a11 11 0 0 0 5 5l1-2 5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z",
  pin: "M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
  clock: "M12 7v5l3 2M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z",
  check: "M5 12.5l4.5 4.5L19 7",
  shield:
    "M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3zm-1.5 9 4-4M9 12l1.5 1.5",
  star: "M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 17l-5.2 2.6 1-5.8L3.5 9.7l5.9-.9L12 3.5z",
  whatsapp:
    "M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3zm0 2a7 7 0 0 1 0 14 7 7 0 0 1-3.6-1l-.3-.2-2 .5.6-2-.2-.3A7 7 0 0 1 12 5zm-2.3 3.4c-.2 0-.5 0-.7.4-.3.4-.9 1-.9 2.3s.9 2.6 1 2.8c.2.2 1.8 2.9 4.5 3.9 2.2.8 2.7.7 3.2.6.5 0 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.7-.4c-.4-.2-1.5-.7-1.7-.8-.2 0-.4-.1-.6.2l-.8 1c-.2.2-.3.2-.6.1-.4-.2-1.2-.5-2.2-1.3-.8-.7-1.3-1.5-1.5-1.8-.1-.3 0-.4.1-.6l.5-.5.3-.5v-.5l-.8-1.9c-.2-.4-.4-.4-.6-.4z",
  plus: "M12 5v14M5 12h14",
  quote:
    "M9 7H6a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2v4M19 7h-3a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2v4",
  arrow: "M5 12h14M13 6l6 6-6 6",
  mail: "M4 6h16v12H4zM4 7l8 6 8-6",
  chevron: "M6 9l6 6 6-6",
};

export function Icon({
  name,
  className = "h-6 w-6",
}: {
  name: keyof typeof I;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d={I[name]} />
    </svg>
  );
}

/** Native select — özel chevron, input'larla aynı görünüm. */
export function Select({
  className = "",
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  const empty = props.value === "";
  return (
    <div className="relative">
      <select
        {...props}
        className={`${className} cursor-pointer appearance-none pr-10 ${
          empty ? "!text-ink-soft" : ""
        }`}
      >
        {children}
      </select>
      <Icon
        name="chevron"
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft"
      />
    </div>
  );
}

export const serviceIconByCode: Record<string, keyof typeof I> = {
  "01": "wrench",
  "02": "gauge",
  "03": "spray",
  "04": "tire",
  "05": "clipboard",
  "06": "gear",
};

/* ── navigation ─────────────────────────────────────────────────────── */

const nav = [
  { to: "/", label: "Anasayfa" },
  { to: "/hizmetler", label: "Hizmetler" },
  { to: "/hakkimizda", label: "Hakkımızda" },
  { to: "/blog", label: "Blog" },
  { to: "/iletisim", label: "İletişim" },
];

function Logo({ size = "h-9 w-9" }: { size?: string }) {
  return (
    <span
      className={`grid ${size} place-items-center rounded-xl bg-brand font-display text-lg font-extrabold text-white`}
    >
      Ç
    </span>
  );
}

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-canvas/85 backdrop-blur-md">
      <Container className="flex h-[68px] items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <Logo />
          <span className="font-display text-lg font-extrabold text-navy">
            {site.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="rounded-full px-4 py-2 text-[15px] font-medium text-ink-soft transition-colors hover:bg-white hover:text-navy [&.active]:bg-white [&.active]:text-brand"
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={site.phoneHref}
            className="hidden items-center gap-2 text-[15px] font-bold text-navy sm:flex"
          >
            <Icon name="phone" className="h-4 w-4 text-brand" />
            {site.phoneLabel}
          </a>
          <Button to="/randevu" className="px-5 py-2.5 text-[14px]">
            Randevu
          </Button>
        </div>
      </Container>
    </header>
  );
}

/* ── footer ─────────────────────────────────────────────────────────── */

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-white">
      <Container className="grid gap-12 py-16 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <Logo />
            <span className="font-display text-lg font-extrabold text-navy">
              {site.name}
            </span>
          </div>
          <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-ink-soft">
            {site.tagline}. Maslak Oto Sanayi'nde her marka aracın bakım ve
            onarımını şeffaf fiyat ve güler yüzle yapıyoruz.
          </p>
          <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand-soft px-3 py-1.5 text-[13px] font-semibold text-brand-ink">
            <Icon name="shield" className="h-4 w-4" /> Maslak Oto Sanayi
          </span>
        </div>

        <div>
          <h4 className="font-display text-sm font-bold text-navy">Menü</h4>
          <ul className="mt-5 space-y-3">
            {nav.concat({ to: "/randevu", label: "Randevu Al" }).map((n) => (
              <li key={n.to}>
                <Link
                  to={n.to}
                  className="text-[15px] text-ink-soft transition-colors hover:text-brand"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-bold text-navy">İletişim</h4>
          <ul className="mt-5 space-y-4 text-[15px] text-ink-soft">
            <li>
              <a
                href={site.phoneHref}
                className="font-semibold text-navy hover:text-brand"
              >
                {site.phoneLabel}
              </a>
            </li>
            <li>{site.address}</li>
            <li>{site.hours}</li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-line">
        <Container className="flex flex-col gap-2 py-6 text-sm text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 {site.name}</span>
          <span>Maslak · Sarıyer / İstanbul</span>
        </Container>
      </div>
    </footer>
  );
}

/* ── trust & conversion helpers ─────────────────────────────────────── */

export function Stars({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <span
      className="flex items-center gap-0.5 text-amber"
      aria-label="5 yıldız"
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Icon key={i} name="star" className={`${className} fill-amber`} />
      ))}
    </span>
  );
}

type Brand = { name: string; domain: string };

function BrandLogo({ brand }: { brand: Brand }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <span className="shrink-0 font-display text-xl font-bold text-navy/40">
        {brand.name}
      </span>
    );
  }
  return (
    <img
      src={`https://logo.clearbit.com/${brand.domain}?size=120&format=png`}
      alt={`${brand.name} servisi`}
      loading="lazy"
      onError={() => setFailed(true)}
      className="h-9 w-auto shrink-0 object-contain opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0"
    />
  );
}

export function BrandMarquee({ items }: { items: Brand[] }) {
  const row = [...items, ...items];
  return (
    <div className="marquee overflow-hidden">
      <div className="marquee-track items-center gap-12 py-1">
        {row.map((b, i) => (
          <BrandLogo key={`${b.name}-${i}`} brand={b} />
        ))}
      </div>
    </div>
  );
}

/** İnce duyuru / güven çubuğu — Nav'ın üstünde. */
export function TopBar() {
  return (
    <div className="bg-navy text-white">
      <Container className="flex h-9 items-center justify-between text-[13px]">
        <span className="flex items-center gap-2">
          <Stars className="h-3.5 w-3.5" />
          <span className="hidden text-white/80 sm:inline">
            Google'da 5.0 · Maslak Oto Sanayi
          </span>
        </span>
        <span className="flex items-center gap-4">
          <span className="hidden items-center gap-1.5 text-white/80 md:flex">
            <Icon name="clock" className="h-3.5 w-3.5" /> {site.hours}
          </span>
          <a
            href={site.phoneHref}
            className="flex items-center gap-1.5 font-semibold"
          >
            <Icon name="phone" className="h-3.5 w-3.5" /> {site.phoneLabel}
          </a>
        </span>
      </Container>
    </div>
  );
}

/** Sabit WhatsApp butonu — hızlı iletişim, mobilde dönüşüm. */
export function FloatingWhatsApp() {
  return (
    <a
      href={site.whatsappHref}
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp'tan yazın"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3.5 font-semibold text-white shadow-[0_12px_30px_-8px_rgba(37,211,102,0.7)] transition-transform hover:scale-105"
    >
      <Icon name="whatsapp" className="h-6 w-6" />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}
