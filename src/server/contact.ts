import { createServerFn } from "@tanstack/react-start";

export type ContactInput = {
  name: string;
  phone: string;
  vehicle?: string;
  service?: string;
  message?: string;
};

/**
 * Pure input validation — trust boundary. Exported so it can be unit-checked
 * without spinning up the server (see contact.check.mjs mirror of these rules).
 * ponytail: hand-rolled validator instead of zod — 5 fields, no dep needed.
 */
export function parseContact(data: unknown): ContactInput {
  if (typeof data !== "object" || data === null) {
    throw new Error("Geçersiz veri gönderildi.");
  }
  const d = data as Record<string, unknown>;
  const str = (v: unknown) =>
    String(v ?? "")
      .trim()
      .slice(0, 1000);

  const name = str(d.name);
  const phone = str(d.phone);
  if (name.length < 2) throw new Error("Lütfen ad soyad giriniz.");
  if (phone.replace(/\D/g, "").length < 7)
    throw new Error("Lütfen geçerli bir telefon numarası giriniz.");

  return {
    name,
    phone,
    vehicle: str(d.vehicle) || undefined,
    service: str(d.service) || undefined,
    message: str(d.message) || undefined,
  };
}

export const sendContact = createServerFn({ method: "POST" })
  .validator(parseContact)
  .handler(async ({ data }) => {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (!token || !chatId) {
      // Misconfig must not look like a user error.
      throw new Error("Form şu an alınamıyor. Lütfen bizi telefonla arayın.");
    }

    const text = [
      "🔧 Yeni Randevu Talebi — Çiğdem Servis",
      `Ad Soyad: ${data.name}`,
      `Telefon: ${data.phone}`,
      data.vehicle && `Araç: ${data.vehicle}`,
      data.service && `Hizmet: ${data.service}`,
      data.message && `Mesaj: ${data.message}`,
    ]
      .filter(Boolean)
      .join("\n");

    const res = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // No parse_mode → kullanıcı metni Markdown olarak yorumlanmaz (güvenli).
        body: JSON.stringify({ chat_id: chatId, text }),
      },
    );

    if (!res.ok) {
      throw new Error("Talebiniz iletilemedi. Lütfen telefonla deneyin.");
    }
    return { ok: true as const };
  });
