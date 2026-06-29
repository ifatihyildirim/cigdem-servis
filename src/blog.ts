// Blog içeriği — tek kaynak. SEO için İstanbul/Maslak odaklı, gerçek faydalı yazılar.
// ponytail: MDX/CMS yerine tipli veri dizisi — birkaç yazı için yeterli, bağımlılık yok.

export type Block =
  { t: "h2"; x: string } | { t: "p"; x: string } | { t: "ul"; x: string[] };

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO
  readMins: number;
  tag: string;
  body: Block[];
};

export const posts: Post[] = [
  {
    slug: "arac-periyodik-bakim-ne-zaman",
    title: "Araç Periyodik Bakımı Ne Zaman Yapılır? 2026 Rehberi",
    description:
      "Periyodik bakım kaç km'de bir yapılır, neleri kapsar? Maslak Çiğdem Servis'in hazırladığı km ve süre bazlı tam bakım takvimi.",
    date: "2026-05-12",
    readMins: 6,
    tag: "Bakım",
    body: [
      {
        t: "p",
        x: "Periyodik bakım, aracınızın ömrünü uzatan ve beklenmedik arıza maliyetlerini önleyen en önemli işlemdir. Çoğu sürücünün kafasını karıştıran soru ise şudur: bakım kaç km'de bir yapılmalı? Bu rehberde km ve süre bazlı bakım takvimini ve nelere dikkat etmeniz gerektiğini anlatıyoruz.",
      },
      { t: "h2", x: "Periyodik bakım kaç km'de bir yapılır?" },
      {
        t: "p",
        x: "Genel kural, her 15.000 km veya yılda bir kez (hangisi önce dolarsa) bakım yaptırmaktır. Ancak bu süre araç markasına, motor tipine (dizel/benzin) ve kullanım koşullarına göre değişir. Şehir içi yoğun trafikte kullanılan araçlarda bakım aralığı kısalır.",
      },
      { t: "h2", x: "Periyodik bakımda neler yapılır?" },
      {
        t: "ul",
        x: [
          "Motor yağı ve yağ filtresi değişimi",
          "Hava, polen ve yakıt filtresi kontrolü/değişimi",
          "Fren balata ve disk kontrolü",
          "Triger kayışı / zinciri kontrolü",
          "Akü, buji ve kayış-gergi kontrolü",
          "Antifriz, fren hidroliği ve diğer sıvı seviyeleri",
        ],
      },
      { t: "h2", x: "Bakımı ertelemek size neye mal olur?" },
      {
        t: "p",
        x: "Zamanında yapılmayan yağ değişimi motor aşınmasını hızlandırır; ihmal edilen triger kayışı kopması ise motorun komple yenilenmesine kadar gidebilir. Küçük bir bakım masrafı, büyük bir onarım faturasını önler.",
      },
      {
        t: "p",
        x: "Maslak ve çevresinde periyodik bakımınızı garantili ve şeffaf fiyatla yaptırmak için Çiğdem Servis'ten randevu alabilirsiniz.",
      },
    ],
  },
  {
    slug: "maslak-oto-servis-secimi",
    title: "Maslak'ta Oto Servis Seçerken Dikkat Edilecek 7 Şey",
    description:
      "İstanbul Maslak'ta güvenilir oto servis nasıl seçilir? Şeffaf fiyattan garantiye, doğru servisi bulmanın 7 altın kuralı.",
    date: "2026-04-03",
    readMins: 5,
    tag: "Rehber",
    body: [
      {
        t: "p",
        x: "Aracınızı emanet edeceğiniz servis, hem cebinizi hem güvenliğinizi doğrudan etkiler. İstanbul'da, özellikle Maslak Oto Sanayi gibi yoğun bir bölgede doğru servisi seçmek için şu 7 noktaya dikkat edin.",
      },
      {
        t: "ul",
        x: [
          "Yazılı ve onaylı fiyat teklifi veriyor mu? Sürpriz fatura çıkmamalı.",
          "İşçilik garantisi sunuyor mu?",
          "Kullanılan parçalar faturalı ve orijinal/eşdeğer mi?",
          "Arıza tespiti cihazla mı yapılıyor, tahminle mi?",
          "Değişen eski parçaları size gösteriyor mu?",
          "Google ve gerçek müşteri yorumları ne diyor?",
          "Aracınızın markasına dair tecrübesi var mı?",
        ],
      },
      { t: "h2", x: "Şeffaflık her şeyin önünde" },
      {
        t: "p",
        x: "İyi bir servis, yapılması gerekeni de gerekmeyeni de açıkça söyler. Gereksiz işlem önermez. Çiğdem Servis olarak her iş emrinde parça ve işçiliği ayrı kalemlerle, onayınıza sunarak çalışıyoruz.",
      },
    ],
  },
  {
    slug: "araci-kisa-hazirlama-kontrol-listesi",
    title: "Aracınızı Kışa Hazırlama: Tam Kontrol Listesi",
    description:
      "Kış lastiği, antifriz, akü ve fren kontrolü. İstanbul kışında aracınızı güvenle kullanmak için adım adım hazırlık rehberi.",
    date: "2026-03-18",
    readMins: 4,
    tag: "İpucu",
    body: [
      {
        t: "p",
        x: "Soğuk havalar araç performansını ve güvenliğini doğrudan etkiler. İstanbul'da kış aylarına girmeden önce aracınızda şu kontrolleri yaptırmanız, yolda kalma riskini büyük ölçüde azaltır.",
      },
      { t: "h2", x: "Kışa hazırlık kontrol listesi" },
      {
        t: "ul",
        x: [
          "Kış lastiği: 4°C altında yaz lastiği sertleşir, fren mesafesi uzar.",
          "Antifriz seviyesi ve donma derecesi kontrolü",
          "Akü sağlığı: soğuk, zayıf aküyü ilk vuran etkendir.",
          "Fren balata ve disk kontrolü",
          "Cam suyu antifrizli mi? Silecek lastikleri sağlam mı?",
          "Far ve sis lambası ayarı",
        ],
      },
      {
        t: "p",
        x: "Bu kontrollerin tamamını tek seferde, kış bakımı paketiyle Çiğdem Servis'te yaptırabilirsiniz.",
      },
    ],
  },
];

export const postBySlug = (slug: string) => posts.find((p) => p.slug === slug);
