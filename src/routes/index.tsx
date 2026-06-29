import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Container,
  Eyebrow,
  Button,
  Icon,
  Stars,
  BrandMarquee,
  serviceIconByCode,
} from "../components/site";
import { JsonLd, faqSchema, pageMeta } from "../components/seo";
import { site, services, brands, faqs, reviews } from "../config";
import { posts } from "../blog";

export const Route = createFileRoute("/")({
  head: () =>
    pageMeta({
      title: "Çiğdem Servis · Maslak Oto Servis & Bakım Merkezi | İstanbul",
      description:
        "Maslak'ta her marka araç için periyodik bakım, mekanik onarım, kaporta-boya, lastik ve ekspertiz. Şeffaf fiyat, garantili işçilik. Hemen randevu alın.",
      path: "",
    }),
  component: Home,
});

const stats = [
  { icon: "star", value: "5.0", label: "Google puanı" },
  { icon: "gear", value: "Tüm marka", label: "& modele servis" },
  { icon: "check", value: "Şeffaf", label: "yazılı fiyat" },
  { icon: "clock", value: "Aynı gün", label: "teslim imkânı" },
] as const;

const reasons = [
  {
    icon: "check",
    title: "Onaylı, yazılı fiyat",
    text: "İşleme başlamadan parça ve işçiliği ayrı ayrı yazılı paylaşırız. Sürpriz fatura yok.",
  },
  {
    icon: "shield",
    title: "Garantili işçilik",
    text: "Tüm işlemler garanti kapsamında. Aynı arıza tekrarlarsa ek ücret almadan çözeriz.",
  },
  {
    icon: "gear",
    title: "Orijinal & faturalı parça",
    text: "OEM ve eşdeğer parçada faturalı tedarik. Takılan her parçayı net bilirsiniz.",
  },
  {
    icon: "gauge",
    title: "Cihazla arıza tespiti",
    text: "Tahminle değil, OBD arıza tespit cihazıyla kesin teşhis ve doğru onarım.",
  },
] as const;

const steps = [
  {
    n: "1",
    icon: "clipboard",
    title: "Randevu & teşhis",
    text: "Aracınızı getirin; cihaz destekli arıza tespitiyle sorunu net belirleyelim.",
  },
  {
    n: "2",
    icon: "check",
    title: "Onaylı teklif",
    text: "Maliyeti önceden, yazılı paylaşırız. Onayınız olmadan işleme başlamayız.",
  },
  {
    n: "3",
    icon: "shield",
    title: "Garantili teslim",
    text: "Son kontrolleri yapılmış aracınızı, işçilik garantisiyle zamanında teslim alırsınız.",
  },
] as const;

function Home() {
  const latest = posts.slice(0, 3);
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="mesh relative overflow-hidden border-b border-line">
        <Container className="relative grid items-center gap-14 py-16 md:py-20 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="reveal" style={{ animationDelay: "0ms" }}>
              <Eyebrow>
                <Icon name="pin" className="h-4 w-4" /> Maslak Oto Sanayi ·
                Sarıyer / İstanbul
              </Eyebrow>
            </div>

            <h1
              className="reveal mt-6 text-[clamp(2.6rem,6vw,4.6rem)]"
              style={{ animationDelay: "80ms" }}
            >
              Aracınız onarılsın,{" "}
              <span className="text-brand">cebiniz değil.</span>
            </h1>

            <p
              className="reveal mt-5 max-w-md text-lg leading-relaxed text-ink-soft"
              style={{ animationDelay: "160ms" }}
            >
              Maslak'ta her marka araç için periyodik bakım, kaporta-boya,
              mekanik onarım ve lastik. Önce yazılı fiyat veririz, gereksiz
              işlem önermeyiz, garantiyle teslim ederiz.
            </p>

            <div
              className="reveal mt-8 flex flex-wrap items-center gap-3"
              style={{ animationDelay: "240ms" }}
            >
              <Button to="/randevu">Hemen Randevu Al</Button>
              <Button href={site.phoneHref} variant="ghost">
                <Icon name="phone" className="h-4 w-4" /> {site.phoneLabel}
              </Button>
            </div>

            <div
              className="reveal mt-7 flex items-center gap-3"
              style={{ animationDelay: "320ms" }}
            >
              <Stars />
              <span className="text-sm text-ink-soft">
                <a
                  href={site.reviewUrl}
                  className="font-semibold text-navy hover:text-brand"
                >
                  Google'da 5.0 puan
                </a>{" "}
                · şeffaf ve güvenilir servis
              </span>
            </div>
          </div>

          {/* contact card */}
          <div
            className="reveal lg:justify-self-end"
            style={{ animationDelay: "280ms" }}
          >
            <div className="card w-full max-w-sm overflow-hidden p-0">
              <div className="bg-navy px-7 py-6 text-white">
                <div className="flex items-center gap-2">
                  <Stars className="h-4 w-4" />
                  <span className="text-sm text-white/80">
                    Google'da 5.0 puan
                  </span>
                </div>
                <p className="mt-4 text-sm text-white/70">
                  Servis hattı · hemen arayın
                </p>
                <a
                  href={site.phoneHref}
                  className="mt-1 block font-display text-3xl font-extrabold text-white"
                >
                  {site.phoneLabel}
                </a>
              </div>

              <div className="space-y-4 p-7">
                <InfoLine icon="pin" label="Adres" value={site.address} />
                <InfoLine
                  icon="clock"
                  label="Çalışma saatleri"
                  value={site.hours}
                />
                <div className="flex items-center gap-2 rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-success">
                  <span className="h-2 w-2 rounded-full bg-success" /> Randevuya
                  uygun
                </div>
                <Button to="/randevu" className="w-full">
                  Online randevu oluştur
                </Button>
              </div>
            </div>
          </div>
        </Container>

        {/* stat band */}
        <div className="border-t border-line bg-white/60 backdrop-blur">
          <Container className="grid grid-cols-2 gap-3 py-7 lg:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="flex items-center gap-3 rounded-2xl border border-line bg-white px-4 py-3.5 shadow-[var(--shadow-soft)]"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand">
                  <Icon name={s.icon} className="h-5 w-5" />
                </span>
                <div className="leading-tight">
                  <p className="font-display text-lg font-extrabold text-navy">
                    {s.value}
                  </p>
                  <p className="text-[13px] text-ink-soft">{s.label}</p>
                </div>
              </div>
            ))}
          </Container>
        </div>
      </section>

      {/* ── BRANDS ────────────────────────────────────────────────── */}
      <section className="border-b border-line bg-white py-10">
        <Container>
          <p className="mb-6 text-center text-sm font-medium uppercase tracking-wide text-ink-soft">
            Tüm bina markalarına servis veriyoruz
          </p>
          <BrandMarquee items={brands} />
        </Container>
      </section>

      {/* ── PROBLEM ───────────────────────────────────────────────── */}
      <section className="py-20">
        <Container>
          <div className="flex flex-col items-center text-center">
            <Eyebrow>Tanıdık geldi mi?</Eyebrow>
            <h2 className="mt-5 max-w-2xl text-[clamp(2rem,4.5vw,3.2rem)]">
              Araç servise bırakmanın asıl derdi
            </h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              {
                t: "Sürpriz fatura",
                x: "İşlem bittiğinde, beklediğinizin kat kat üstünde bir tutarla karşılaşmak.",
              },
              {
                t: "Gereksiz işlem",
                x: "“Bu gerçekten gerekli miydi?” sorusunu kafanızdan atamamak.",
              },
              {
                t: "Geciken teslim",
                x: "Söz verilen gün gelmek, aracın hâlâ hazır olmadığını duymak.",
              },
            ].map((p) => (
              <div
                key={p.t}
                className="rounded-2xl border border-line bg-canvas p-7"
              >
                <h3 className="text-lg text-navy">{p.t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
                  {p.x}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-lg font-semibold text-navy">
            Çiğdem Servis'te üçünün de yanıtı baştan belli.{" "}
            <a
              href="#neden-biz"
              className="text-brand underline decoration-2 underline-offset-4 hover:text-brand-ink"
            >
              İşte nasıl ↓
            </a>
          </p>
        </Container>
      </section>

      {/* ── SERVICES ──────────────────────────────────────────────── */}
      <section className="py-20">
        <Container>
          <div className="flex flex-col items-center text-center">
            <Eyebrow>Hizmetlerimiz</Eyebrow>
            <h2 className="mt-5 max-w-2xl text-[clamp(2rem,4.5vw,3.2rem)]">
              Aracınıza dair her şey, tek serviste
            </h2>
            <p className="mt-4 max-w-xl text-lg text-ink-soft">
              Bakımdan kaporta-boyaya, lastikten ekspertize — farklı yerlere
              taşımanıza gerek yok.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <Link
                key={s.code}
                to="/hizmetler"
                hash={s.code}
                className="card card-hover group p-7"
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-soft text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                  <Icon name={serviceIconByCode[s.code]} className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-xl">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
                  {s.blurb}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand">
                  Detaylar
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* ── WHY US ────────────────────────────────────────────────── */}
      <section
        id="neden-biz"
        className="scroll-mt-24 border-y border-line bg-white py-20"
      >
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <Eyebrow>Neden Çiğdem Servis?</Eyebrow>
            <h2 className="mt-5 text-[clamp(2rem,4.5vw,3rem)]">
              Güveni sözle değil, işle veriyoruz
            </h2>
            <p className="mt-4 max-w-sm text-lg text-ink-soft">
              Aracınızı kendi aracımız gibi düşünür, gerekmeyen işlemi yazmayız.
              Her iş emrinde dört söz veririz:
            </p>
            <Button to="/hakkimizda" variant="ghost" className="mt-7">
              Bizi daha yakından tanıyın
            </Button>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {reasons.map((r) => (
              <div key={r.title} className="card p-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-soft text-brand">
                  <Icon name={r.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg">{r.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
                  {r.text}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── PROCESS ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20">
        <div className="dotgrid absolute inset-0 opacity-50" aria-hidden />
        <Container className="relative">
          <div className="flex flex-col items-center text-center">
            <Eyebrow>Nasıl çalışır</Eyebrow>
            <h2 className="mt-5 text-[clamp(2rem,4.5vw,3.2rem)]">
              Üç adımda, sürprizsiz
            </h2>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n} className="card relative p-8 text-center">
                <span className="absolute -top-4 left-1/2 grid h-9 w-9 -translate-x-1/2 place-items-center rounded-full bg-brand font-display text-sm font-bold text-white">
                  {s.n}
                </span>
                <span className="mx-auto mt-2 grid h-14 w-14 place-items-center rounded-2xl bg-brand-soft text-brand">
                  <Icon name={s.icon} className="h-7 w-7" />
                </span>
                <h3 className="mt-5 text-xl">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
                  {s.text}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── REVIEWS ───────────────────────────────────────────────── */}
      <section className="border-y border-line bg-white py-20">
        <Container>
          <div className="flex flex-col items-center text-center">
            <Eyebrow>Müşteri yorumları</Eyebrow>
            <h2 className="mt-5 text-[clamp(2rem,4.5vw,3rem)]">
              Sürücüler ne diyor?
            </h2>
          </div>
          <div className="mx-auto mt-10 max-w-4xl">
            {reviews.length > 0 ? (
              <div className="grid gap-5 sm:grid-cols-2">
                {reviews.map((r) => (
                  <figure key={r.name} className="card p-7">
                    <Stars />
                    <blockquote className="mt-4 text-[17px] leading-relaxed text-navy">
                      “{r.text}”
                    </blockquote>
                    <figcaption className="mt-4 text-sm font-semibold text-ink-soft">
                      — {r.name}
                    </figcaption>
                  </figure>
                ))}
              </div>
            ) : (
              <div className="card flex flex-col items-center gap-4 p-10 text-center">
                <Stars className="h-6 w-6" />
                <p className="text-xl font-semibold text-navy">
                  Google'da 5.0 / 5 puanlıyız
                </p>
                <p className="max-w-md text-ink-soft">
                  Hizmetimizden memnun kaldıysanız, deneyiminizi paylaşarak
                  diğer sürücülere yardımcı olun. Yorumunuz bizim için çok
                  değerli.
                </p>
                <a
                  href={site.reviewUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 font-semibold text-brand hover:text-brand-ink"
                >
                  Google'da değerlendirin →
                </a>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────── */}
      <section className="py-20">
        <Container className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <Eyebrow>Sık sorulan sorular</Eyebrow>
            <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.8rem)]">
              Aklınızdaki soru?
            </h2>
            <p className="mt-4 text-ink-soft">
              Cevabını bulamadıysanız bizi arayın, memnuniyetle yardımcı olalım.
            </p>
            <Button href={site.phoneHref} variant="ghost" className="mt-6">
              <Icon name="phone" className="h-4 w-4" /> {site.phoneLabel}
            </Button>
          </div>
          <div className="faq space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="card group p-0">
                <summary className="flex items-center justify-between gap-4 px-6 py-5">
                  <span className="text-lg font-semibold text-navy">{f.q}</span>
                  <span className="chev grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-soft text-brand">
                    <Icon name="plus" className="h-4 w-4" />
                  </span>
                </summary>
                <p className="px-6 pb-6 text-[15px] leading-relaxed text-ink-soft">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </Container>
        <JsonLd data={faqSchema} />
      </section>

      {/* ── BLOG TEASER ───────────────────────────────────────────── */}
      <section className="border-t border-line bg-white py-20">
        <Container>
          <div className="flex flex-col items-end justify-between gap-4 sm:flex-row">
            <div>
              <Eyebrow>Blog & rehberler</Eyebrow>
              <h2 className="mt-5 text-[clamp(2rem,4.5vw,3rem)]">
                Aracınız için faydalı bilgiler
              </h2>
            </div>
            <Link
              to="/blog"
              className="font-semibold text-brand hover:text-brand-ink"
            >
              Tüm yazılar →
            </Link>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {latest.map((p) => (
              <Link
                key={p.slug}
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="card card-hover group flex flex-col p-7"
              >
                <span className="inline-flex w-fit items-center rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-ink">
                  {p.tag}
                </span>
                <h3 className="mt-4 text-xl leading-snug">{p.title}</h3>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink-soft">
                  {p.description}
                </p>
                <span className="mt-4 text-sm font-semibold text-brand">
                  Devamını oku →
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="py-20">
        <Container>
          <div className="relative overflow-hidden rounded-[2rem] bg-navy px-8 py-14 text-center sm:px-14">
            <div
              className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full opacity-40 blur-[90px]"
              style={{
                background: "radial-gradient(circle, #2563eb, transparent 65%)",
              }}
              aria-hidden
            />
            <h2 className="relative mx-auto max-w-2xl text-[clamp(1.8rem,4vw,3rem)] text-white">
              Bugün küçük bir bakım, yarın büyük bir fatura değil.
            </h2>
            <p className="relative mx-auto mt-4 max-w-md text-white/70">
              Randevu oluşturun, ücretsiz ön ekspertizle yola çıkalım. Fiyatı
              görmeden hiçbir işleme başlamayız.
            </p>
            <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button to="/randevu">Hemen Randevu Al</Button>
              <a
                href={site.phoneHref}
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-white hover:text-navy"
              >
                <Icon name="phone" className="h-4 w-4" /> {site.phoneLabel}
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function InfoLine({
  icon,
  label,
  value,
}: {
  icon: "pin" | "clock";
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3">
      <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-canvas text-brand">
        <Icon name={icon} className="h-4 w-4" />
      </span>
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-ink-soft">
          {label}
        </p>
        <p className="text-[15px] text-navy">{value}</p>
      </div>
    </div>
  );
}
