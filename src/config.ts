// Tek kaynak: marka & iletişim bilgileri. Değişiklik burada yapılır.
export const site = {
  name: "Çiğdem Servis",
  short: "ÇİĞDEM",
  tagline: "Oto Servis & Bakım Merkezi",
  // SEO: yayına alınca gerçek alan adıyla değiştirin (canonical + sitemap için).
  url: "https://www.cigdemservis.com",
  phoneLabel: "0535 623 20 01",
  phoneHref: "tel:+905356232001",
  whatsappHref: "https://wa.me/905356232001",
  email: "info@cigdemservis.com",
  street: "Atatürk Oto Sanayi Sitesi, A Blok 44. Sokak",
  district: "Maslak, Sarıyer",
  city: "İstanbul",
  postalCode: "34398",
  address:
    "Maslak Atatürk Oto Sanayi Sitesi, A Blok 44. Sokak, Sarıyer / İstanbul",
  hours: "Pzt–Cum 08:30–18:30 · Cmt 08:30–15:00 · Paz kapalı",
  // Google Maps place koordinatı (Maslak Atatürk Oto Sanayi, A Blok 44. Sokak).
  geo: { lat: 41.116297, lng: 29.021324 },
  ratingValue: "5.0",
  ratingCount: "1",
  mapsHref:
    "https://www.google.com/maps/dir/?api=1&destination=41.116297,29.021324",
  reviewUrl: "https://www.google.com/maps?cid=8254337231463074497",
} as const;

// Servis verilen markalar (yerel SEO + güven). Logo: car-logos-dataset (GitHub raw), yedek: yazı.
export const brands = [
  { name: "Volkswagen", slug: "volkswagen" },
  { name: "Audi", slug: "audi" },
  { name: "BMW", slug: "bmw" },
  { name: "Mercedes", slug: "mercedes-benz" },
  { name: "Renault", slug: "renault" },
  { name: "Ford", slug: "ford" },
  { name: "Fiat", slug: "fiat" },
  { name: "Toyota", slug: "toyota" },
  { name: "Hyundai", slug: "hyundai" },
  { name: "Peugeot", slug: "peugeot" },
  { name: "Opel", slug: "opel" },
  { name: "Skoda", slug: "skoda" },
];

export const brandNames = brands.map((b) => b.name);

// Marka seçimi için kapsamlı Türkiye pazarı listesi (alfabetik).
export const allBrands = [
  "Alfa Romeo",
  "Audi",
  "BMW",
  "BYD",
  "Chery",
  "Chevrolet",
  "Citroën",
  "Cupra",
  "Dacia",
  "Daihatsu",
  "DFSK",
  "Dodge",
  "DS Automobiles",
  "Fiat",
  "Ford",
  "Geely",
  "Honda",
  "Hyundai",
  "Isuzu",
  "Iveco",
  "Jaguar",
  "Jeep",
  "Kia",
  "Lada",
  "Lancia",
  "Land Rover",
  "Lexus",
  "Maserati",
  "Mazda",
  "Mercedes-Benz",
  "MG",
  "Mini",
  "Mitsubishi",
  "Nissan",
  "Opel",
  "Peugeot",
  "Porsche",
  "Proton",
  "Renault",
  "Seat",
  "Skoda",
  "Smart",
  "SsangYong",
  "Subaru",
  "Suzuki",
  "Tata",
  "Tesla",
  "Tofaş",
  "Togg",
  "Toyota",
  "Volkswagen",
  "Volvo",
];

// Sık sorulan sorular — hem güven hem SEO (FAQPage schema'sını besler).
export const faqs = [
  {
    q: "Maslak'ta hangi marka araçlara servis veriyorsunuz?",
    a: "Volkswagen, Audi, BMW, Mercedes, Renault, Ford ve diğer tüm bina markalarına periyodik bakım, mekanik onarım, kaporta-boya ve lastik hizmeti veriyoruz. Aracınızın garantisini koruyan, üretici takvimine uygun bakım yapıyoruz.",
  },
  {
    q: "Bakım öncesi fiyat öğrenebilir miyim?",
    a: "Evet. İşleme başlamadan önce parça ve işçilik kalemlerini ayrı ayrı içeren yazılı bir teklif paylaşırız. Onayınız olmadan hiçbir işlem yapılmaz; sürpriz fatura çıkmaz.",
  },
  {
    q: "Randevu almadan gelebilir miyim?",
    a: "Gelebilirsiniz, ancak önceden randevu almanız bekleme süresini kısaltır. Telefon, WhatsApp veya web sitesindeki randevu formundan birkaç dakikada randevu oluşturabilirsiniz.",
  },
  {
    q: "Yapılan işlemler garantili mi?",
    a: "Tüm işçiliğimiz garanti kapsamındadır. Aynı arıza tekrarlarsa ek ücret almadan çözeriz. Kullanılan parçalar faturalı ve garantilidir.",
  },
  {
    q: "Çiğdem Servis nerede, nasıl ulaşırım?",
    a: "Maslak Atatürk Oto Sanayi Sitesi, A Blok 44. Sokak, Sarıyer / İstanbul adresindeyiz. Sarıyer, Şişli ve çevresinden kolay ulaşım sağlanır. İletişim sayfasından yol tarifi alabilirsiniz.",
  },
];

// Gerçek müşteri yorumları buraya. Google'dan kopyalayıp ekleyin —
// uydurma yorum EKLEMEYİN. Boşken site dürüst bir "ilk yorumu siz yazın" kartı gösterir.
export const reviews: { name: string; text: string; date?: string }[] = [];

export const services = [
  {
    code: "01",
    title: "Periyodik Bakım",
    blurb:
      "Yağ, filtre ve fren bakımları üretici servis takvimine birebir uygun; garantiniz korunur.",
    points: ["Motor yağı & filtre", "Fren & balata", "Triger / kayış kontrolü"],
  },
  {
    code: "02",
    title: "Genel Mekanik Onarım",
    blurb:
      "Motor, şanzıman ve süspansiyon arızalarında bilgisayarlı arıza tespiti ve kesin çözüm.",
    points: ["Motor & şanzıman", "Süspansiyon", "Arıza tespit cihazı"],
  },
  {
    code: "03",
    title: "Kaporta & Boya",
    blurb:
      "Fırın boyahane ve renk eşleştirme ile çizik, ezik ve kaza onarımı; fabrika çıkışı görünüm.",
    points: ["Fırın boya", "Renk eşleştirme", "PDR göçük onarım"],
  },
  {
    code: "04",
    title: "Lastik · Rot · Balans",
    blurb:
      "Mevsimlik lastik değişimi, dijital rot ayarı ve balans ile düzgün ve güvenli sürüş.",
    points: ["Lastik değişimi", "Dijital rot ayarı", "Balans"],
  },
  {
    code: "05",
    title: "Araç Ekspertiz",
    blurb:
      "Alım-satım öncesi 0–100 detaylı kontrol; gizli hasar ve boya raporu şeffaf biçimde.",
    points: ["Boya & hasar raporu", "Mekanik kontrol", "OBD taraması"],
  },
  {
    code: "06",
    title: "Orijinal Yedek Parça",
    blurb:
      "OEM ve eşdeğer parça tedariki; faturalı, garantili ve aynı gün stoktan teslim.",
    points: ["OEM & eşdeğer", "Garantili", "Hızlı tedarik"],
  },
] as const;

export const serviceOptions = services.map((s) => s.title);
