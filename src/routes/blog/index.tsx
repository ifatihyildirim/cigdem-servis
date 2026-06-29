import { createFileRoute, Link } from "@tanstack/react-router";
import { Container, Eyebrow, Icon } from "../../components/site";
import { pageMeta } from "../../components/seo";
import { posts } from "../../blog";

export const Route = createFileRoute("/blog/")({
  head: () =>
    pageMeta({
      title: "Blog · Oto Bakım Rehberleri | Çiğdem Servis Maslak",
      description:
        "Periyodik bakım, kaporta-boya, lastik ve oto servis rehberleri. Maslak Çiğdem Servis'ten araç sahipleri için faydalı, güncel bilgiler.",
      path: "/blog",
    }),
  component: BlogList,
});

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

function BlogList() {
  return (
    <>
      <section className="mesh relative overflow-hidden border-b border-line py-16">
        <Container className="relative text-center">
          <Eyebrow>Blog & rehberler</Eyebrow>
          <h1 className="mx-auto mt-5 max-w-3xl text-[clamp(2.4rem,6vw,4.2rem)]">
            Aracınız için faydalı bilgiler
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-ink-soft">
            Bakım, onarım ve sürüş üzerine sade, uygulanabilir rehberler.
          </p>
        </Container>
      </section>

      <section className="py-16">
        <Container className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <Link
              key={p.slug}
              to="/blog/$slug"
              params={{ slug: p.slug }}
              className="card card-hover group flex flex-col p-7"
            >
              <div className="flex items-center gap-3 text-xs text-ink-soft">
                <span className="rounded-full bg-brand-soft px-3 py-1 font-semibold text-brand-ink">
                  {p.tag}
                </span>
                <span className="flex items-center gap-1">
                  <Icon name="clock" className="h-3.5 w-3.5" /> {p.readMins} dk
                </span>
              </div>
              <h2 className="mt-4 text-xl leading-snug text-navy">{p.title}</h2>
              <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink-soft">
                {p.description}
              </p>
              <div className="mt-5 flex items-center justify-between border-t border-line pt-4 text-sm">
                <span className="text-ink-soft">{fmt(p.date)}</span>
                <span className="font-semibold text-brand">Oku →</span>
              </div>
            </Link>
          ))}
        </Container>
      </section>
    </>
  );
}
