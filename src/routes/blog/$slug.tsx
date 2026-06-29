import { createFileRoute, Link } from "@tanstack/react-router";
import { Container, Button, Icon } from "../../components/site";
import { JsonLd, blogPostingSchema, pageMeta } from "../../components/seo";
import { posts, postBySlug } from "../../blog";
import { site } from "../../config";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => {
    const post = postBySlug(params.slug);
    if (!post) return {};
    return pageMeta({
      title: `${post.title} | Çiğdem Servis Blog`,
      description: post.description,
      path: `/blog/${post.slug}`,
    });
  },
  component: BlogPost,
});

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

function BlogPost() {
  const { slug } = Route.useParams();
  const post = postBySlug(slug);

  if (!post) {
    return (
      <Container className="py-24 text-center">
        <h1 className="text-3xl">Yazı bulunamadı</h1>
        <p className="mt-3 text-ink-soft">
          Aradığınız yazı taşınmış veya kaldırılmış olabilir.
        </p>
        <Link to="/blog" className="mt-6 inline-block font-semibold text-brand">
          ← Tüm yazılar
        </Link>
      </Container>
    );
  }

  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <article className="py-12">
      <Container className="max-w-3xl">
        <Link
          to="/blog"
          className="inline-flex items-center gap-1 text-sm font-semibold text-ink-soft hover:text-brand"
        >
          ← Blog
        </Link>

        <div className="mt-6 flex items-center gap-3 text-sm text-ink-soft">
          <span className="rounded-full bg-brand-soft px-3 py-1 font-semibold text-brand-ink">
            {post.tag}
          </span>
          <span>{fmt(post.date)}</span>
          <span className="flex items-center gap-1">
            <Icon name="clock" className="h-3.5 w-3.5" /> {post.readMins} dk
            okuma
          </span>
        </div>

        <h1 className="mt-4 text-[clamp(2rem,5vw,3.2rem)] leading-tight">
          {post.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-soft">
          {post.description}
        </p>

        <div className="mt-8 space-y-5 border-t border-line pt-8">
          {post.body.map((b, i) => {
            if (b.t === "h2")
              return (
                <h2 key={i} className="pt-2 text-[clamp(1.4rem,3vw,2rem)]">
                  {b.x}
                </h2>
              );
            if (b.t === "ul")
              return (
                <ul key={i} className="space-y-2">
                  {b.x.map((li) => (
                    <li
                      key={li}
                      className="flex gap-3 text-[17px] leading-relaxed text-ink"
                    >
                      <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-soft text-brand">
                        <Icon name="check" className="h-3 w-3" />
                      </span>
                      {li}
                    </li>
                  ))}
                </ul>
              );
            return (
              <p key={i} className="text-[17px] leading-relaxed text-ink">
                {b.x}
              </p>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 flex flex-col items-start gap-4 rounded-2xl bg-navy p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-xl text-white">Aracınızın bakımı mı geldi?</h3>
            <p className="mt-1 text-white/70">
              Maslak'ta şeffaf fiyat, garantili işçilik.
            </p>
          </div>
          <Button to="/randevu">Randevu Al</Button>
        </div>
      </Container>

      {/* related */}
      {related.length > 0 && (
        <Container className="mt-16 max-w-3xl">
          <h3 className="text-xl">İlgili yazılar</h3>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {related.map((p) => (
              <Link
                key={p.slug}
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="card card-hover p-6"
              >
                <span className="text-xs font-semibold text-brand-ink">
                  {p.tag}
                </span>
                <h4 className="mt-2 text-lg leading-snug text-navy">
                  {p.title}
                </h4>
              </Link>
            ))}
          </div>
        </Container>
      )}

      <JsonLd data={blogPostingSchema(post)} />
    </article>
  );
}
