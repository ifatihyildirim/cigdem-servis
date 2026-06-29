import { createFileRoute } from "@tanstack/react-router";
import { Container, Eyebrow, Icon } from "../components/site";
import { ContactForm } from "../components/contact-form";
import { pageMeta } from "../components/seo";
import { site } from "../config";

export const Route = createFileRoute("/iletisim")({
  head: () =>
    pageMeta({
      title: "İletişim · Maslak Oto Servis Adres & Telefon | Çiğdem Servis",
      description:
        "Çiğdem Servis Maslak: Atatürk Oto Sanayi Sitesi, A Blok 44. Sokak, Sarıyer / İstanbul. Telefon, WhatsApp, çalışma saatleri ve yol tarifi. Hemen ulaşın.",
      path: "/iletisim",
    }),
  component: Contact,
});

const mapSrc =
  "https://maps.google.com/maps?q=41.116297,29.021324&z=17&output=embed";

const rows = [
  { icon: "phone", k: "Telefon", v: site.phoneLabel, href: site.phoneHref },
  {
    icon: "check",
    k: "WhatsApp",
    v: "Mesaj gönderin",
    href: site.whatsappHref,
  },
  { icon: "pin", k: "Adres", v: site.address },
  { icon: "clock", k: "Çalışma saatleri", v: site.hours },
] as const;

function Contact() {
  return (
    <>
      <section className="relative overflow-hidden py-16">
        <div
          className="pointer-events-none absolute -right-24 -top-28 h-[440px] w-[440px] rounded-full opacity-70 blur-[120px]"
          style={{
            background: "radial-gradient(circle, #cfe0ff, transparent 65%)",
          }}
          aria-hidden
        />
        <Container className="relative text-center">
          <Eyebrow>İletişim</Eyebrow>
          <h1 className="mx-auto mt-5 max-w-3xl text-[clamp(2.4rem,6vw,4.2rem)]">
            Aracınızla mı dertlisiniz?{" "}
            <span className="text-brand">Bir telefon kadar yakınız.</span>
          </h1>
        </Container>
      </section>

      <section className="pb-20">
        <Container className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div>
            <div className="grid gap-3 sm:grid-cols-2">
              {rows.map((r) => (
                <InfoCard key={r.k} {...r} />
              ))}
            </div>

            <div className="card mt-3 overflow-hidden p-0">
              <iframe
                title="Çiğdem Servis konum"
                src={mapSrc}
                className="h-[300px] w-full"
                loading="lazy"
              />
              <a
                href={site.mapsHref}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 border-t border-line py-3.5 text-[15px] font-semibold text-brand transition-colors hover:bg-brand-soft"
              >
                <Icon name="pin" className="h-4 w-4" /> Yol tarifi al
              </a>
            </div>
          </div>

          <div className="card p-7 sm:p-9">
            <h2 className="text-2xl">Bize yazın</h2>
            <p className="mb-6 mt-1 text-ink-soft">
              En kısa sürede dönüş yaparız.
            </p>
            <ContactForm />
          </div>
        </Container>
      </section>
    </>
  );
}

function InfoCard({
  icon,
  k,
  v,
  href,
}: {
  icon: "phone" | "check" | "pin" | "clock";
  k: string;
  v: string;
  href?: string;
}) {
  const body = (
    <>
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-soft text-brand">
        <Icon name={icon} className="h-5 w-5" />
      </span>
      <div className="mt-3">
        <p className="text-xs font-medium uppercase tracking-wide text-ink-soft">
          {k}
        </p>
        <p className="mt-0.5 font-semibold text-navy">{v}</p>
      </div>
    </>
  );
  const cls = "card p-5 " + (href ? "card-hover block" : "");
  return href ? (
    <a href={href} className={cls}>
      {body}
    </a>
  ) : (
    <div className={cls}>{body}</div>
  );
}
