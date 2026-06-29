import { createFileRoute } from "@tanstack/react-router";
import { Container, Eyebrow, Button, Icon, Stars } from "../components/site";
import { pageMeta } from "../components/seo";
import { site } from "../config";

export const Route = createFileRoute("/hakkimizda")({
  head: () =>
    pageMeta({
      title: "Hakkımızda · Maslak'ın Güvenilir Oto Servisi | Çiğdem Servis",
      description:
        "Çiğdem Servis, Maslak Oto Sanayi'nde her marka aracın bakım ve onarımını şeffaflık, garanti ve güler yüzle yapan tam donanımlı bir oto servistir.",
      path: "/hakkimizda",
    }),
  component: About,
});

const values = [
  {
    icon: "check",
    title: "Şeffaflık",
    text: "Her iş emrinde parça ve işçilik ayrı ayrı yazılı. Onayınız olmadan hiçbir işlem başlamaz.",
  },
  {
    icon: "shield",
    title: "Garantili işçilik",
    text: "Yapılan tüm işlemler garanti kapsamında. Sorun tekrarlarsa ek ücret almadan çözeriz.",
  },
  {
    icon: "gear",
    title: "Orijinal parça",
    text: "OEM ve eşdeğer parçada faturalı tedarik. Hangi parçanın takıldığını net bilirsiniz.",
  },
  {
    icon: "clock",
    title: "Zamanında teslim",
    text: "Verdiğimiz teslim saatine sadık kalırız; gecikme olursa önceden haber veririz.",
  },
] as const;

function About() {
  return (
    <>
      <section className="relative overflow-hidden py-16">
        <div
          className="pointer-events-none absolute -right-24 -top-28 h-[460px] w-[460px] rounded-full opacity-70 blur-[120px]"
          style={{
            background: "radial-gradient(circle, #cfe0ff, transparent 65%)",
          }}
          aria-hidden
        />
        <Container className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <Eyebrow>
              <Icon name="shield" className="h-4 w-4" /> Maslak Oto Sanayi'nde
            </Eyebrow>
            <h1 className="mt-6 text-[clamp(2.4rem,6vw,4.6rem)]">
              Aracınızı bıraktığınızda{" "}
              <span className="text-brand">içiniz rahat olsun diye</span>
            </h1>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-soft">
              {site.name}, Maslak Atatürk Oto Sanayi Sitesi'nde her marka aracın
              bakım ve onarımını üstlenen tam donanımlı bir servistir. Kurumsal
              standardı, mahalle esnafı dürüstlüğüyle birleştiriyoruz — gereksiz
              işlem yazmadan, sözümüzü tutarak.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button to="/randevu">Hemen Randevu Al</Button>
              <Button to="/hizmetler" variant="ghost">
                Hizmetleri Gör
              </Button>
            </div>
          </div>

          <div className="card overflow-hidden p-0">
            <div className="flex items-center justify-between bg-navy px-7 py-5 text-white">
              <div>
                <Stars />
                <p className="mt-1.5 text-sm text-white/70">
                  Google'da 5.0 / 5 · Maslak
                </p>
              </div>
              <span className="font-display text-4xl font-extrabold leading-none">
                5.0
              </span>
            </div>

            <ul className="divide-y divide-line">
              {[
                { icon: "gear", t: "Her marka & modele servis" },
                { icon: "check", t: "Yazılı, onaylı fiyat" },
                { icon: "shield", t: "Garantili işçilik & faturalı parça" },
                { icon: "clock", t: "Aynı gün teslim imkânı" },
              ].map((r) => (
                <li key={r.t} className="flex items-center gap-3 px-7 py-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand">
                    <Icon name={r.icon as "gear"} className="h-5 w-5" />
                  </span>
                  <span className="font-medium text-navy">{r.t}</span>
                </li>
              ))}
            </ul>

            <div className="flex items-start gap-3 border-t border-line bg-canvas px-7 py-5">
              <Icon name="pin" className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
              <p className="text-sm leading-relaxed text-ink-soft">
                {site.address}
                <br />
                <span className="text-navy">{site.hours}</span>
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-line bg-white py-20">
        <Container>
          <div className="text-center">
            <Eyebrow>Çalışma ilkelerimiz</Eyebrow>
            <h2 className="mt-5 text-[clamp(2rem,4.5vw,3.2rem)]">
              Neden bizi seçiyorlar?
            </h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {values.map((v) => (
              <div key={v.title} className="card flex gap-5 p-7">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand">
                  <Icon name={v.icon} className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="text-xl">{v.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
                    {v.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <blockquote className="mx-auto max-w-3xl text-center">
            <p className="font-display text-[clamp(1.6rem,3.5vw,2.6rem)] font-semibold leading-tight text-navy">
              “Aracınızı kendi aracımız gibi düşünür,
              <span className="text-brand"> gerekmeyen işlemi yazmayız.”</span>
            </p>
            <footer className="mt-6 text-sm font-medium text-ink-soft">
              — Çiğdem Servis ekibi
            </footer>
          </blockquote>
          <div className="mt-10 flex justify-center">
            <Button to="/randevu">Randevu oluşturun</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
