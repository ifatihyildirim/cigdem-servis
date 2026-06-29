import { site, faqs } from "../config";
import type { Post } from "../blog";

/**
 * JSON-LD yapısal veri — Google'ın işletmeyi, SSS'leri ve blog yazılarını
 * zengin sonuç olarak göstermesini sağlar. SSR HTML'ine basılır, crawler okur.
 */
export function JsonLd({ data }: { data: unknown }) {
  // < kaçışı: string değerlerdeki olası </script> ile script kapanmasını önler.
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}

const openingHours = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:30",
    closes: "18:30",
  },
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: "Saturday",
    opens: "08:30",
    closes: "15:00",
  },
];

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  "@id": `${site.url}/#business`,
  name: site.name,
  image: `${site.url}/og.jpg`,
  url: site.url,
  telephone: site.phoneLabel,
  email: site.email,
  priceRange: "₺₺",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.street,
    addressLocality: site.district,
    addressRegion: site.city,
    postalCode: site.postalCode,
    addressCountry: "TR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: site.geo.lat,
    longitude: site.geo.lng,
  },
  areaServed: ["Maslak", "Sarıyer", "Şişli", "İstanbul"],
  openingHoursSpecification: openingHours,
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: site.ratingValue,
    reviewCount: site.ratingCount,
  },
};

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export function blogPostingSchema(post: Post) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: site.name },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: { "@type": "ImageObject", url: `${site.url}/logo.png` },
    },
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
  };
}

/** Sayfa başına meta — head() içinde kullanılır. */
export function pageMeta(opts: {
  title: string;
  description: string;
  path?: string;
}) {
  const url = site.url + (opts.path ?? "");
  return {
    meta: [
      { title: opts.title },
      { name: "description", content: opts.description },
      { property: "og:title", content: opts.title },
      { property: "og:description", content: opts.description },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "tr_TR" },
      { property: "og:url", content: url },
      { property: "og:site_name", content: site.name },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
