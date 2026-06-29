# Çiğdem Servis

Maslak oto servis & bakım merkezi için çok sayfalı tanıtım sitesi.
**TanStack Start** (React + TanStack Router, SSR) + **Tailwind CSS v4**.

## Çalıştırma

```bash
npm install
cp .env.example .env   # Telegram bot bilgilerini doldurun
npm run dev            # http://localhost:3000
```

`npm run build` && `npm run start` ile production.

## İletişim formu → Telegram

`/randevu` ve `/iletisim` formları, token'ı sunucuda tutan bir TanStack Start
server function (`src/server/contact.ts`) üzerinden Telegram'a düşer.
İki ortam değişkeni gerekir:

- `TELEGRAM_BOT_TOKEN` — BotFather'dan alınan token
- `TELEGRAM_CHAT_ID` — mesajların gideceği sohbet/grup id'si

> Token istemciye **asla** sızmaz; `fetch` yalnızca sunucu handler'ında çalışır.

## Yapı

```
src/
  config.ts            # marka + hizmet verisi (tek kaynak)
  router.tsx
  routes/              # / · /hizmetler · /hakkimizda · /randevu · /iletisim
  components/          # site (nav/footer/ui), contact-form
  server/contact.ts    # server function: doğrulama + Telegram gönderimi
  styles.css           # Tailwind v4 + "precision garage" tasarım sistemi
```
