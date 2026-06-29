import { createFileRoute } from "@tanstack/react-router";
import {
  Container,
  Eyebrow,
  Button,
  Icon,
  serviceIconByCode,
} from "../components/site";
import { pageMeta } from "../components/seo";
import { services } from "../config";

export const Route = createFileRoute("/hizmetler")({
  head: () =>
    pageMeta({
      title: "Hizmetler · Bakım, Kaporta-Boya, Lastik | Çiğdem Servis Maslak",
      description:
        "Maslak'ta periyodik bakım, genel mekanik onarım, kaporta-boya, lastik-rot-balans, araç ekspertiz ve orijinal yedek parça. Garantili işçilik, şeffaf fiyat.",
      path: "/hizmetler",
    }),
  component: Services,
});

function Services() {
  return (
    <>
      <section className="relative overflow-hidden py-16">
        <div
          className="pointer-events-none absolute -left-24 -top-28 h-[440px] w-[440px] rounded-full opacity-70 blur-[120px]"
          style={{
            background: "radial-gradient(circle, #cfe0ff, transparent 65%)",
          }}
          aria-hidden
        />
        <Container className="relative text-center">
          <Eyebrow>Servis kataloğu</Eyebrow>
          <h1 className="mx-auto mt-5 max-w-3xl text-[clamp(2.4rem,6vw,4.4rem)]">
            Bir araç, tek servis, sıfır koşturma
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-ink-soft">
            Bakım, kaporta, lastik, ekspertiz — hepsi kendi atölyemizde. Her
            işten önce yazılı fiyat, her işten sonra garanti.
          </p>
        </Container>
      </section>

      <section className="pb-10">
        <Container className="space-y-6">
          {services.map((s, i) => (
            <article
              key={s.code}
              id={s.code}
              className="card scroll-mt-24 grid items-center gap-8 p-7 sm:p-10 lg:grid-cols-[1fr_1fr]"
            >
              <div className={i % 2 ? "lg:order-2" : ""}>
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-soft text-brand">
                  <Icon name={serviceIconByCode[s.code]} className="h-7 w-7" />
                </span>
                <h2 className="mt-5 text-[clamp(1.7rem,3.5vw,2.4rem)]">
                  {s.title}
                </h2>
                <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ink-soft">
                  {s.blurb}
                </p>
                <Button to="/randevu" variant="ghost" className="mt-6">
                  Bu hizmet için fiyat al
                </Button>
              </div>

              <ul
                className={`grid gap-3 sm:grid-cols-1 ${i % 2 ? "lg:order-1" : ""}`}
              >
                {s.points.map((p) => (
                  <li
                    key={p}
                    className="flex items-center gap-3 rounded-xl bg-canvas px-5 py-4"
                  >
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand text-white">
                      <Icon name="check" className="h-4 w-4" />
                    </span>
                    <span className="text-[15px] font-medium text-navy">
                      {p}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="card flex flex-col items-center justify-between gap-5 p-8 text-center sm:flex-row sm:text-left">
            <div>
              <h2 className="text-[clamp(1.5rem,3vw,2.2rem)]">
                Aradığınız hizmeti bulamadınız mı?
              </h2>
              <p className="mt-2 text-ink-soft">
                Bize sorun, en uygun çözümü birlikte bulalım.
              </p>
            </div>
            <Button to="/iletisim">Bize ulaşın</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
