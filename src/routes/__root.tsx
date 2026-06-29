import type { ReactNode } from "react";
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { Nav, Footer, TopBar, FloatingWhatsApp } from "../components/site";
import { JsonLd, localBusinessSchema } from "../components/seo";
import { site } from "../config";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Çiğdem Servis · Maslak Oto Servis & Bakım Merkezi | İstanbul" },
      {
        name: "description",
        content:
          "Maslak Atatürk Oto Sanayi'nde her marka araç için periyodik bakım, mekanik onarım, kaporta-boya, lastik ve ekspertiz. Şeffaf fiyat, garantili işçilik. Sarıyer / İstanbul.",
      },
      {
        name: "keywords",
        content:
          "maslak oto servis, sarıyer oto servis, istanbul periyodik bakım, maslak kaporta boya, oto tamir maslak, çiğdem servis",
      },
      { name: "theme-color", content: "#2563eb" },
      { name: "robots", content: "index, follow" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "tr_TR" },
      { property: "og:site_name", content: site.name },
      { property: "og:image", content: `${site.url}/og.jpg` },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <TopBar />
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <JsonLd data={localBusinessSchema} />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="tr">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
