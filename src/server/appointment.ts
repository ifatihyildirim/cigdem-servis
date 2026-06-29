import { createServerFn } from "@tanstack/react-start";

export type AppointmentInput = {
  marka: string;
  model: string;
  yil?: string;
  yakit?: string;
  vites?: string;
  km?: string;
  plaka?: string;
  services: string[];
  subServices?: string[];
  tarih?: string;
  saat?: string;
  ad: string;
  soyad: string;
  telefon: string;
  eposta?: string;
  aciklama?: string;
  kvkk: boolean;
};

const str = (v: unknown, max = 200) =>
  String(v ?? "")
    .trim()
    .slice(0, max);
const arr = (v: unknown, max = 40) =>
  Array.isArray(v)
    ? v
        .map((x) => str(x, 80))
        .filter(Boolean)
        .slice(0, max)
    : [];

// Trust boundary — randevu formu doğrulaması. ponytail: 6 alan, el yazımı yeterli.
export function parseAppointment(data: unknown): AppointmentInput {
  if (typeof data !== "object" || data === null)
    throw new Error("Geçersiz veri gönderildi.");
  const d = data as Record<string, unknown>;

  const ad = str(d.ad, 80);
  const soyad = str(d.soyad, 80);
  const telefon = str(d.telefon, 30);
  const services = arr(d.services, 12);

  if (ad.length < 2) throw new Error("Lütfen adınızı girin.");
  if (soyad.length < 2) throw new Error("Lütfen soyadınızı girin.");
  if (telefon.replace(/\D/g, "").length < 10)
    throw new Error("Lütfen geçerli bir telefon numarası girin.");
  if (services.length === 0) throw new Error("Lütfen en az bir hizmet seçin.");
  if (d.kvkk !== true)
    throw new Error("Devam etmek için onay kutusunu işaretleyin.");

  const subServices = arr(d.subServices, 40);
  return {
    marka: str(d.marka, 80),
    model: str(d.model, 80),
    yil: str(d.yil, 10) || undefined,
    yakit: str(d.yakit, 30) || undefined,
    vites: str(d.vites, 30) || undefined,
    km: str(d.km, 12) || undefined,
    plaka: str(d.plaka, 20) || undefined,
    services,
    subServices: subServices.length ? subServices : undefined,
    tarih: str(d.tarih, 20) || undefined,
    saat: str(d.saat, 10) || undefined,
    ad,
    soyad,
    telefon,
    eposta: str(d.eposta, 120) || undefined,
    aciklama: str(d.aciklama, 1000) || undefined,
    kvkk: true,
  };
}

export const sendAppointment = createServerFn({ method: "POST" })
  .validator(parseAppointment)
  .handler(async ({ data }) => {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (!token || !chatId)
      throw new Error("Form şu an alınamıyor. Lütfen bizi telefonla arayın.");

    const arac = [data.marka, data.model, data.yil && `(${data.yil})`]
      .filter(Boolean)
      .join(" ");
    const aracOzet = [data.yakit, data.vites].filter(Boolean).join(" · ");
    const aracAlt = [data.km && `${data.km} km`, data.plaka]
      .filter(Boolean)
      .join(" · ");

    const lines: (string | false | undefined)[] = [
      "🗓 YENİ RANDEVU TALEBİ — Çiğdem Servis",
      "",
      `👤 ${data.ad} ${data.soyad}`,
      `📞 ${data.telefon}`,
      data.eposta && `✉️ ${data.eposta}`,
      "",
      arac && `🚗 ${arac}`,
      aracOzet && `⚙️ ${aracOzet}`,
      aracAlt && `🔢 ${aracAlt}`,
      "",
      `🛠 Hizmet: ${data.services.join(", ")}`,
      data.subServices && `   ↳ ${data.subServices.join(", ")}`,
      (data.tarih || data.saat) &&
        `📅 Randevu: ${[data.tarih, data.saat].filter(Boolean).join(" ")}`,
      data.aciklama && `📝 ${data.aciklama}`,
    ];
    const text = lines.filter((l) => l !== false && l != null).join("\n");

    const res = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text }),
      },
    );
    if (!res.ok)
      throw new Error("Talebiniz iletilemedi. Lütfen telefonla deneyin.");
    return { ok: true as const };
  });
