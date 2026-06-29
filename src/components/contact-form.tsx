import { useState } from "react";
import { sendContact } from "../server/contact";
import { serviceOptions } from "../config";
import { formatTrPhone, lettersOnly, alphaNum } from "../lib/format";
import { Icon, Select } from "./site";

type Status =
  | { state: "idle" }
  | { state: "sending" }
  | { state: "ok" }
  | { state: "error"; message: string };

const field =
  "w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-[15px] text-ink placeholder:text-ink-soft/50 outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/10";
const label = "mb-1.5 block text-[13px] font-semibold text-navy";

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ state: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setStatus({ state: "sending" });
    try {
      await sendContact({
        data: {
          name: String(fd.get("name") ?? ""),
          phone: String(fd.get("phone") ?? ""),
          vehicle: String(fd.get("vehicle") ?? ""),
          service: String(fd.get("service") ?? ""),
          message: String(fd.get("message") ?? ""),
        },
      });
      form.reset();
      setStatus({ state: "ok" });
    } catch (err) {
      setStatus({
        state: "error",
        message:
          err instanceof Error
            ? err.message
            : "Bir hata oluştu, lütfen tekrar deneyin.",
      });
    }
  }

  if (status.state === "ok") {
    return (
      <div className="rounded-2xl border border-success/30 bg-green-50 p-10 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-success text-white">
          <Icon name="check" className="h-7 w-7" />
        </span>
        <p className="mt-4 font-display text-2xl font-bold text-navy">
          Talebiniz alındı!
        </p>
        <p className="mt-2 text-ink-soft">
          En kısa sürede sizi arayacağız. Acil durumda telefonla
          ulaşabilirsiniz.
        </p>
        <button
          onClick={() => setStatus({ state: "idle" })}
          className="mt-6 text-sm font-semibold text-brand hover:text-brand-ink"
        >
          Yeni talep gönder
        </button>
      </div>
    );
  }

  const sending = status.state === "sending";

  return (
    <form onSubmit={onSubmit} className="grid gap-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="name">
            Ad Soyad *
          </label>
          <input
            id="name"
            name="name"
            required
            className={field}
            placeholder="Adınız"
            onChange={(e) => {
              e.currentTarget.value = lettersOnly(e.currentTarget.value);
            }}
          />
        </div>
        <div>
          <label className={label} htmlFor="phone">
            Telefon *
          </label>
          <input
            id="phone"
            name="phone"
            required
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            maxLength={14}
            className={field}
            placeholder="0### ### ## ##"
            onChange={(e) => {
              e.currentTarget.value = formatTrPhone(e.currentTarget.value);
            }}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="vehicle">
            Araç (marka / model / yıl)
          </label>
          <input
            id="vehicle"
            name="vehicle"
            className={field}
            placeholder="Örn. VW Passat 2018"
            onChange={(e) => {
              e.currentTarget.value = alphaNum(e.currentTarget.value, 60);
            }}
          />
        </div>
        <div>
          <label className={label} htmlFor="service">
            Hizmet
          </label>
          <Select id="service" name="service" className={field} defaultValue="">
            <option value="" disabled>
              Seçiniz
            </option>
            {serviceOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
            <option value="Diğer">Diğer / Emin değilim</option>
          </Select>
        </div>
      </div>

      <div>
        <label className={label} htmlFor="message">
          Mesajınız
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className={`${field} resize-none`}
          placeholder="Aracınızdaki sorunu kısaca anlatın..."
        />
      </div>

      {status.state === "error" && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {status.message}
        </p>
      )}

      <button
        type="submit"
        disabled={sending}
        className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-[15px] font-semibold text-white shadow-[0_10px_24px_-10px_rgba(37,99,235,0.7)] transition-all duration-300 hover:bg-brand-ink hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
      >
        {sending ? "Gönderiliyor…" : "Talebi gönder"}
        {!sending && (
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        )}
      </button>

      <p className="text-xs text-ink-soft">
        * zorunlu alanlar · bilgileriniz yalnızca sizinle iletişim için
        kullanılır.
      </p>
    </form>
  );
}
