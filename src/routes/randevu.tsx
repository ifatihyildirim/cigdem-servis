import { createFileRoute } from "@tanstack/react-router";
import { Container, Eyebrow, Icon } from "../components/site";
import { AppointmentWizard } from "../components/appointment-wizard";
import { pageMeta } from "../components/seo";
import { site } from "../config";

export const Route = createFileRoute("/randevu")({
  head: () =>
    pageMeta({
      title: "Randevu Al · Maslak Oto Servis | Çiğdem Servis",
      description:
        "Maslak Çiğdem Servis'ten online randevu alın. Araç bilgisi, hizmet seçimi ve uygun saat — birkaç adımda. Ücretsiz ön ekspertiz, garantili işçilik.",
      path: "/randevu",
    }),
  component: Randevu,
});

const perks = [
  "Ücretsiz ön ekspertiz",
  "Onaylı, yazılı fiyat",
  "İşçilik garantisi",
  "Aynı gün dönüş",
];

function Randevu() {
  return (
    <section className="relative overflow-hidden py-12">
      <div
        className="pointer-events-none absolute -left-24 -top-28 h-[440px] w-[440px] rounded-full opacity-70 blur-[120px]"
        style={{
          background: "radial-gradient(circle, #cfe0ff, transparent 65%)",
        }}
        aria-hidden
      />
      <Container className="relative">
        <div className="mx-auto max-w-2xl">
          <div className="text-center">
            <Eyebrow>Online Randevu</Eyebrow>
            <h1 className="mt-5 text-[clamp(2.2rem,5vw,3.6rem)]">
              Birkaç adım, <span className="text-brand">net bir fiyat</span>
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-lg leading-relaxed text-ink-soft">
              Aracınızı ve istediğiniz hizmeti seçin, uygun saati belirleyin.
              Sizi arayıp randevunuzu netleştirelim.
            </p>

            <ul className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2">
              {perks.map((p) => (
                <li
                  key={p}
                  className="flex items-center gap-1.5 text-sm font-medium text-navy"
                >
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-brand text-white">
                    <Icon name="check" className="h-3 w-3" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10">
            <AppointmentWizard />
          </div>

          <p className="mt-6 text-center text-ink-soft">
            Telefonla randevu:{" "}
            <a
              href={site.phoneHref}
              className="font-semibold text-brand hover:text-brand-ink"
            >
              {site.phoneLabel}
            </a>
          </p>
        </div>
      </Container>
    </section>
  );
}
