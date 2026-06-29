// Form alanı maskeleri / girdi filtreleri. Hepsi "yaz-engelle" mantığıyla
// onChange içinde değeri yeniden yazar; geçersiz karakter hiç girilmez.

// TR telefon: sadece rakam, en fazla 11 hane, "0### ### ## ##".
export function formatTrPhone(value: string): string {
  let d = value.replace(/\D/g, "");
  if (d && d[0] !== "0") d = "0" + d;
  d = d.slice(0, 11);
  const p = [d.slice(0, 4), d.slice(4, 7), d.slice(7, 9), d.slice(9, 11)];
  return p.filter(Boolean).join(" ");
}

// TR plaka: yalnızca harf/rakam/boşluk, büyük harf, "34 ABC 123" düzeni.
export function formatPlaka(value: string): string {
  const clean = value
    .toLocaleUpperCase("tr-TR")
    .replace(/[^0-9A-ZİĞÜŞÖÇ ]/g, "")
    .replace(/\s+/g, "");
  const il = clean.slice(0, 2).replace(/[^0-9]/g, ""); // ilk 2: il kodu (rakam)
  const rest = clean.slice(2, 10);
  const harf = rest.match(/^[A-ZİĞÜŞÖÇ]+/)?.[0] ?? "";
  const son = rest.slice(harf.length).replace(/[^0-9]/g, "");
  return [il, harf, son].filter(Boolean).join(" ").trim();
}

// Sadece rakam (km, sayısal alanlar).
export function onlyDigits(value: string, max = 12): string {
  return value.replace(/\D/g, "").slice(0, max);
}

// Sadece harf (ad/soyad): Türkçe harfler + boşluk + tire/kesme.
export function lettersOnly(value: string, max = 40): string {
  return value
    .replace(/[^\p{L}\s'-]/gu, "")
    .replace(/\s{2,}/g, " ")
    .slice(0, max);
}

// Marka/model gibi alanlar: harf + rakam + boşluk + nokta/tire.
export function alphaNum(value: string, max = 40): string {
  return value
    .replace(/[^\p{L}\p{N}\s.-]/gu, "")
    .replace(/\s{2,}/g, " ")
    .slice(0, max);
}

// E-posta: boşlukları temizle, küçük harfe çevir.
export function cleanEmail(value: string, max = 120): string {
  return value.replace(/\s/g, "").slice(0, max);
}
