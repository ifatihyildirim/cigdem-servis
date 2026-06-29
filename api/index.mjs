// Vercel serverless köprüsü: TanStack Start'ın web-standart `fetch` handler'ını
// Vercel'in Node (req/res) imzasına çevirir. Bağımlılık yok — Node 20+ global
// Request/Response/Headers kullanır. dist/server/server.js `npm run build` ile üretilir.
import server from "../dist/server/server.js";

export default async function handler(req, res) {
  const proto = req.headers["x-forwarded-proto"] || "https";
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  const url = `${proto}://${host}${req.url}`;

  const headers = new Headers();
  for (const [k, v] of Object.entries(req.headers)) {
    if (Array.isArray(v)) v.forEach((x) => headers.append(k, x));
    else if (v != null) headers.set(k, v);
  }

  const method = req.method || "GET";
  let body;
  if (method !== "GET" && method !== "HEAD") {
    const chunks = [];
    for await (const c of req) chunks.push(c);
    body = Buffer.concat(chunks);
  }

  const request = new Request(url, { method, headers, body, duplex: "half" });
  const response = await server.fetch(request);

  res.statusCode = response.status;
  response.headers.forEach((value, key) => {
    // content-length'i atla: gövdeyi yeniden akıttığımız için uyuşmazlık olabilir.
    if (key.toLowerCase() !== "content-length") res.setHeader(key, value);
  });

  if (response.body) {
    const reader = response.body.getReader();
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      res.write(value);
    }
  }
  res.end();
}
