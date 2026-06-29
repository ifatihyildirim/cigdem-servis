// TR telefon maskesi: sadece rakam, en fazla 11 hane, "0### ### ## ##".
export function formatTrPhone(value: string): string {
  let d = value.replace(/\D/g, "");
  if (d && d[0] !== "0") d = "0" + d;
  d = d.slice(0, 11);
  const p = [d.slice(0, 4), d.slice(4, 7), d.slice(7, 9), d.slice(9, 11)];
  return p.filter(Boolean).join(" ");
}

// Plaka: büyük harf, fazladan boşlukları sadeleştir.
export function formatPlaka(value: string): string {
  return value.toUpperCase().replace(/\s+/g, " ").slice(0, 12);
}
