import { useState } from "react";
import { sendAppointment } from "../server/appointment";
import { services, brandNames } from "../config";
import {
  formatTrPhone,
  formatPlaka,
  onlyDigits,
  lettersOnly,
  alphaNum,
  cleanEmail,
} from "../lib/format";
import { Icon, serviceIconByCode } from "./site";

type Status =
  | { state: "idle" }
  | { state: "sending" }
  | { state: "ok" }
  | { state: "error"; message: string };

type Form = {
  marka: string;
  model: string;
  yil: string;
  yakit: string;
  vites: string;
  km: string;
  plaka: string;
  services: string[];
  subServices: string[];
  tarih: string;
  saat: string;
  ad: string;
  soyad: string;
  telefon: string;
  eposta: string;
  aciklama: string;
  kvkk: boolean;
};

const empty: Form = {
  marka: "",
  model: "",
  yil: "",
  yakit: "",
  vites: "",
  km: "",
  plaka: "",
  services: [],
  subServices: [],
  tarih: "",
  saat: "",
  ad: "",
  soyad: "",
  telefon: "",
  eposta: "",
  aciklama: "",
  kvkk: false,
};

const yakitlar = ["Benzin", "Dizel", "LPG", "Hibrit", "Elektrik"];
const vitesler = ["Manuel", "Otomatik", "Yarı Otomatik"];
const yillar = Array.from({ length: 30 }, (_, i) => String(2026 - i));
const saatler = Array.from({ length: 18 }, (_, i) => {
  const m = 8 * 60 + 30 + i * 30; // 08:30 → 17:00
  return `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
});

const wizSteps = [
  { icon: "gear", title: "Araç Bilgileri" },
  { icon: "wrench", title: "Hizmet Seçimi" },
  { icon: "clipboard", title: "Randevu & İletişim" },
] as const;

const field =
  "w-full rounded-xl border border-line bg-canvas px-4 py-3 text-ink placeholder:text-ink-soft/60 outline-none transition-all focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/10";
const label = "mb-1.5 block text-sm font-semibold text-navy";

export function AppointmentWizard() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Form>(empty);
  const [err, setErr] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>({ state: "idle" });

  const set = <K extends keyof Form>(k: K, v: Form[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const today = new Date().toISOString().slice(0, 10);

  function toggleService(title: string) {
    setForm((f) => {
      const on = f.services.includes(title);
      const svc = services.find((s) => s.title === title);
      const pts = svc ? [...svc.points] : [];
      return {
        ...f,
        services: on
          ? f.services.filter((s) => s !== title)
          : [...f.services, title],
        // hizmet kaldırılırsa alt seçimlerini de temizle
        subServices: on
          ? f.subServices.filter((p) => !pts.includes(p))
          : f.subServices,
      };
    });
  }

  function toggleSub(point: string) {
    setForm((f) => ({
      ...f,
      subServices: f.subServices.includes(point)
        ? f.subServices.filter((p) => p !== point)
        : [...f.subServices, point],
    }));
  }

  function validate(s: number): string | null {
    if (s === 0) {
      if (!form.marka) return "Lütfen aracınızın markasını seçin.";
      if (form.model.trim().length < 1) return "Lütfen model bilgisini girin.";
    }
    if (s === 1 && form.services.length === 0)
      return "Lütfen en az bir hizmet seçin.";
    if (s === 2) {
      if (form.ad.trim().length < 2) return "Lütfen adınızı girin.";
      if (form.soyad.trim().length < 2) return "Lütfen soyadınızı girin.";
      if (form.telefon.replace(/\D/g, "").length < 10)
        return "Lütfen geçerli bir telefon numarası girin.";
      if (!form.kvkk) return "Devam etmek için onay kutusunu işaretleyin.";
    }
    return null;
  }

  function next() {
    const e = validate(step);
    if (e) return setErr(e);
    setErr(null);
    setStep((s) => Math.min(s + 1, wizSteps.length - 1));
  }
  function back() {
    setErr(null);
    setStep((s) => Math.max(s - 1, 0));
  }

  async function submit() {
    const e = validate(2);
    if (e) return setErr(e);
    setErr(null);
    setStatus({ state: "sending" });
    try {
      await sendAppointment({ data: form });
      setStatus({ state: "ok" });
    } catch (error) {
      setStatus({
        state: "error",
        message:
          error instanceof Error
            ? error.message
            : "Bir hata oluştu, lütfen tekrar deneyin.",
      });
    }
  }

  if (status.state === "ok") {
    return (
      <div className="card p-10 text-center sm:p-14">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-success text-white">
          <Icon name="check" className="h-8 w-8" />
        </span>
        <h2 className="mt-5 font-display text-2xl font-bold text-navy">
          Randevu talebiniz alındı!
        </h2>
        <p className="mx-auto mt-2 max-w-md text-ink-soft">
          En kısa sürede sizi arayıp randevunuzu netleştireceğiz. Acil durumda
          telefonla da ulaşabilirsiniz.
        </p>
        <button
          onClick={() => {
            setForm(empty);
            setStep(0);
            setStatus({ state: "idle" });
          }}
          className="mt-6 text-sm font-semibold text-brand hover:text-brand-ink"
        >
          Yeni randevu oluştur
        </button>
      </div>
    );
  }

  return (
    <div className="card overflow-hidden p-0">
      {/* stepper */}
      <div className="border-b border-line bg-canvas/60 px-5 py-6 sm:px-8">
        <div className="flex items-center">
          {wizSteps.map((st, i) => {
            const done = i < step;
            const active = i === step;
            return (
              <div
                key={st.title}
                className="flex flex-1 items-center last:flex-none"
              >
                <div className="flex flex-col items-center gap-2">
                  <span
                    className={`grid h-11 w-11 place-items-center rounded-full transition-colors ${
                      active
                        ? "bg-brand text-white ring-4 ring-brand/15"
                        : done
                          ? "bg-brand text-white"
                          : "bg-white text-ink-soft border border-line"
                    }`}
                  >
                    <Icon name={done ? "check" : st.icon} className="h-5 w-5" />
                  </span>
                  <span
                    className={`hidden text-center text-xs font-semibold sm:block ${
                      active || done ? "text-navy" : "text-ink-soft"
                    }`}
                  >
                    {st.title}
                  </span>
                </div>
                {i < wizSteps.length - 1 && (
                  <span
                    className={`mx-2 h-0.5 flex-1 rounded ${
                      done ? "bg-brand" : "bg-line"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
        <p className="mt-4 text-center text-sm text-ink-soft sm:hidden">
          {step + 1}/3 · {wizSteps[step].title}
        </p>
      </div>

      <div className="p-6 sm:p-9">
        {/* STEP 0 — Araç */}
        {step === 0 && (
          <div className="grid gap-4">
            <h3 className="text-lg text-navy">Aracınızı tanıyalım</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={label}>Marka *</label>
                <select
                  className={field}
                  value={form.marka}
                  onChange={(e) => set("marka", e.target.value)}
                >
                  <option value="">Seçiniz</option>
                  {brandNames.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                  <option value="Diğer">Diğer</option>
                </select>
              </div>
              <div>
                <label className={label}>Model *</label>
                <input
                  className={field}
                  placeholder="Örn. Passat, Corolla"
                  value={form.model}
                  onChange={(e) => set("model", alphaNum(e.target.value))}
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className={label}>Model yılı</label>
                <select
                  className={field}
                  value={form.yil}
                  onChange={(e) => set("yil", e.target.value)}
                >
                  <option value="">Seçiniz</option>
                  {yillar.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={label}>Yakıt</label>
                <select
                  className={field}
                  value={form.yakit}
                  onChange={(e) => set("yakit", e.target.value)}
                >
                  <option value="">Seçiniz</option>
                  {yakitlar.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={label}>Vites</label>
                <select
                  className={field}
                  value={form.vites}
                  onChange={(e) => set("vites", e.target.value)}
                >
                  <option value="">Seçiniz</option>
                  {vitesler.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={label}>Kilometre</label>
                <input
                  className={field}
                  inputMode="numeric"
                  placeholder="Örn. 120000"
                  value={form.km}
                  onChange={(e) => set("km", onlyDigits(e.target.value, 7))}
                />
              </div>
              <div>
                <label className={label}>Plaka</label>
                <input
                  className={field}
                  placeholder="34 ABC 123"
                  value={form.plaka}
                  onChange={(e) => set("plaka", formatPlaka(e.target.value))}
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 1 — Hizmet */}
        {step === 1 && (
          <div className="grid gap-5">
            <h3 className="text-lg text-navy">Hangi hizmeti istiyorsunuz?</h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((s) => {
                const on = form.services.includes(s.title);
                return (
                  <button
                    key={s.code}
                    type="button"
                    onClick={() => toggleService(s.title)}
                    className={`relative flex items-start gap-3 rounded-2xl border p-4 text-left transition-all ${
                      on
                        ? "border-brand bg-brand-soft/60 ring-2 ring-brand/20"
                        : "border-line bg-white hover:border-brand/40"
                    }`}
                  >
                    <span
                      className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${
                        on ? "bg-brand text-white" : "bg-brand-soft text-brand"
                      }`}
                    >
                      <Icon
                        name={serviceIconByCode[s.code]}
                        className="h-5 w-5"
                      />
                    </span>
                    <span className="font-semibold text-navy">{s.title}</span>
                    {on && (
                      <span className="absolute right-2 top-2 grid h-5 w-5 place-items-center rounded-full bg-brand text-white">
                        <Icon name="check" className="h-3 w-3" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* alt hizmetler */}
            {form.services.length > 0 && (
              <div className="rounded-2xl border border-line bg-canvas p-5">
                <p className="text-sm font-semibold text-navy">
                  İlgili işlemler (opsiyonel)
                </p>
                <div className="mt-4 space-y-4">
                  {services
                    .filter((s) => form.services.includes(s.title))
                    .map((s) => (
                      <div key={s.code}>
                        <p className="text-xs font-medium uppercase tracking-wide text-ink-soft">
                          {s.title}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {s.points.map((p) => {
                            const on = form.subServices.includes(p);
                            return (
                              <button
                                key={p}
                                type="button"
                                onClick={() => toggleSub(p)}
                                className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                                  on
                                    ? "border-brand bg-brand text-white"
                                    : "border-line bg-white text-navy hover:border-brand"
                                }`}
                              >
                                {p}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 2 — Randevu & İletişim */}
        {step === 2 && (
          <div className="grid gap-5">
            <h3 className="text-lg text-navy">Randevu ve iletişim bilgileri</h3>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={label}>Tercih ettiğiniz tarih</label>
                <input
                  type="date"
                  min={today}
                  className={field}
                  value={form.tarih}
                  onChange={(e) => set("tarih", e.target.value)}
                />
              </div>
              <div>
                <label className={label}>Saat</label>
                <select
                  className={field}
                  value={form.saat}
                  onChange={(e) => set("saat", e.target.value)}
                >
                  <option value="">Seçiniz</option>
                  {saatler.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={label}>Adınız *</label>
                <input
                  className={field}
                  value={form.ad}
                  onChange={(e) => set("ad", lettersOnly(e.target.value))}
                />
              </div>
              <div>
                <label className={label}>Soyadınız *</label>
                <input
                  className={field}
                  value={form.soyad}
                  onChange={(e) => set("soyad", lettersOnly(e.target.value))}
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={label}>Telefon *</label>
                <input
                  type="tel"
                  inputMode="numeric"
                  maxLength={14}
                  className={field}
                  placeholder="0### ### ## ##"
                  value={form.telefon}
                  onChange={(e) =>
                    set("telefon", formatTrPhone(e.target.value))
                  }
                />
              </div>
              <div>
                <label className={label}>E-posta</label>
                <input
                  type="email"
                  className={field}
                  placeholder="ornek@eposta.com"
                  value={form.eposta}
                  onChange={(e) => set("eposta", cleanEmail(e.target.value))}
                />
              </div>
            </div>

            <div>
              <label className={label}>Açıklama</label>
              <textarea
                rows={3}
                className={`${field} resize-none`}
                placeholder="Aracınızdaki sorunu veya isteğinizi kısaca anlatın..."
                value={form.aciklama}
                onChange={(e) => set("aciklama", e.target.value)}
              />
            </div>

            {/* özet */}
            <div className="rounded-2xl border border-line bg-canvas p-5 text-sm">
              <p className="font-semibold text-navy">Özet</p>
              <ul className="mt-3 space-y-1.5 text-ink-soft">
                <li>
                  <span className="text-navy">Araç:</span>{" "}
                  {[form.marka, form.model, form.yil && `(${form.yil})`]
                    .filter(Boolean)
                    .join(" ") || "—"}
                </li>
                <li>
                  <span className="text-navy">Hizmet:</span>{" "}
                  {form.services.join(", ") || "—"}
                  {form.subServices.length > 0 &&
                    ` (${form.subServices.join(", ")})`}
                </li>
              </ul>
            </div>

            <label className="flex items-start gap-3 text-sm text-ink-soft">
              <input
                type="checkbox"
                checked={form.kvkk}
                onChange={(e) => set("kvkk", e.target.checked)}
                className="mt-0.5 h-5 w-5 shrink-0 rounded border-line accent-[#2563eb]"
              />
              <span>
                Kişisel verilerimin randevu talebim için işlenmesini kabul
                ediyorum. Bilgileriniz yalnızca sizinle iletişim için
                kullanılır.
              </span>
            </label>
          </div>
        )}

        {err && (
          <p className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {err}
          </p>
        )}

        {/* nav */}
        <div className="mt-7 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={back}
            disabled={step === 0}
            className="rounded-full px-5 py-3 text-[15px] font-semibold text-ink-soft transition-colors hover:text-navy disabled:invisible"
          >
            ← Geri
          </button>

          {step < wizSteps.length - 1 ? (
            <button
              type="button"
              onClick={next}
              className="group inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-[15px] font-semibold text-white shadow-[0_10px_24px_-10px_rgba(37,99,235,0.7)] transition-all hover:bg-brand-ink hover:-translate-y-0.5"
            >
              Devam Et
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </button>
          ) : (
            <button
              type="button"
              onClick={submit}
              disabled={status.state === "sending"}
              className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-[15px] font-semibold text-white shadow-[0_10px_24px_-10px_rgba(37,99,235,0.7)] transition-all hover:bg-brand-ink hover:-translate-y-0.5 disabled:opacity-60"
            >
              {status.state === "sending"
                ? "Gönderiliyor…"
                : "Randevu Talebini Gönder"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
