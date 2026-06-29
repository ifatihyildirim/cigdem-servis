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
  {
    slug: "kaporta-boya-fiyatlari-nasil-belirlenir",
    title: "Kaporta ve Boya Fiyatları Nasıl Belirlenir?",
    description:
      "Kaporta boya fiyatını ne belirler? Hasarın boyutu, parça, işçilik ve boya kalitesi. Maslak'ta şeffaf kaporta-boya fiyatlandırması.",
    date: "2026-06-02",
    readMins: 5,
    tag: "Kaporta",
    body: [
      {
        t: "p",
        x: "Kaporta ve boya, aracın hem görünümü hem değeri için en kritik işlemlerden biridir. Peki fiyat neye göre belirlenir, neden serviste serviste değişir? İşte fiyatı etkileyen başlıca kalemler.",
      },
      { t: "h2", x: "Kaporta-boya fiyatını etkileyen 5 faktör" },
      {
        t: "ul",
        x: [
          "Hasarın boyutu ve derinliği (çizik mi, göçük mü, kaza hasarı mı)",
          "İşlem türü: lokal boya, panel boyası veya PDR (boyasız göçük onarımı)",
          "Değişecek parça gerekip gerekmediği (orijinal / eşdeğer)",
          "Boya kalitesi ve renk eşleştirme zorluğu (metalik, sedef vb.)",
          "İşçilik süresi ve fırın boyahane kullanımı",
        ],
      },
      { t: "h2", x: "Boyasız göçük onarımı (PDR) ile tasarruf" },
      {
        t: "p",
        x: "Boyası çatlamamış küçük göçüklerde PDR yöntemiyle, boya yapmadan onarım mümkündür. Bu hem daha ucuz hem de aracın orijinal boyasını korur — ikinci el değerini düşürmez.",
      },
      {
        t: "p",
        x: "Çiğdem Servis'te kaporta-boya işlemine başlamadan önce hasarı inceleyip yazılı, kalem kalem bir teklif sunarız. Onayınız olmadan işlem yapmaz, fabrika çıkışı görünüm için renk eşleştirmesini titizlikle yaparız.",
      },
    ],
  },
  {
    slug: "yag-degisimi-kac-kilometrede-bir",
    title: "Motor Yağı Değişimi Kaç Kilometrede Bir Yapılır?",
    description:
      "Motor yağı kaç km'de bir değişir? Dizel ve benzinde fark, yağ tipi ve geciktirmenin riskleri. Maslak Çiğdem Servis rehberi.",
    date: "2026-05-25",
    readMins: 4,
    tag: "Bakım",
    body: [
      {
        t: "p",
        x: "Motor yağı, motorun kanı gibidir; parçaları yağlar, soğutur ve temiz tutar. Zamanında değişmeyen yağ, motor ömrünü ciddi biçimde kısaltır. Peki ne sıklıkla değişmeli?",
      },
      { t: "h2", x: "Genel kural" },
      {
        t: "ul",
        x: [
          "Mineral yağ: ~7.500 km veya 6 ayda bir",
          "Yarı sentetik: ~10.000 km veya yılda bir",
          "Tam sentetik: ~15.000 km veya yılda bir",
          "Şehir içi yoğun trafik / kısa mesafe: aralığı kısaltın",
        ],
      },
      { t: "h2", x: "Yağ filtresi de değişmeli mi?" },
      {
        t: "p",
        x: "Evet. Her yağ değişiminde yağ filtresinin de değişmesi gerekir; aksi halde yeni yağ, eski filtredeki kirle hızla kirlenir. Çiğdem Servis'te yağ değişiminde filtreyi standart olarak yenileriz ve aracınızın üretici özelliklerine uygun yağı kullanırız.",
      },
    ],
  },
  {
    slug: "lastik-rot-balans-ne-zaman",
    title: "Lastik, Rot ve Balans: Ne Zaman Gerekir?",
    description:
      "Direksiyon titriyor, araç bir tarafa çekiyor mu? Rot ayarı ve balansın belirtileri, lastik değişim zamanı. Maslak'ta lastik hizmetleri.",
    date: "2026-04-20",
    readMins: 4,
    tag: "Lastik",
    body: [
      {
        t: "p",
        x: "Lastikler ve doğru rot-balans ayarı, sürüş güvenliğinin temelidir. Yanlış ayar; lastiği erken aşındırır, yakıtı artırır ve fren mesafesini uzatır.",
      },
      { t: "h2", x: "Rot ayarı gerektiğinin belirtileri" },
      {
        t: "ul",
        x: [
          "Araç düz yolda bir tarafa çekiyor",
          "Direksiyon ortada değilken araç düz gidiyor",
          "Lastiklerin iç veya dış kenarı düzensiz aşınıyor",
        ],
      },
      { t: "h2", x: "Balans gerektiğinin belirtileri" },
      {
        t: "ul",
        x: [
          "Belli bir hızda direksiyonda titreme",
          "Yeni lastik takıldıktan sonra hissedilen titreşim",
        ],
      },
      {
        t: "p",
        x: "Mevsimlik lastik değişimi, dijital rot ayarı ve balansı Çiğdem Servis'te tek seferde yaptırarak düzgün ve güvenli bir sürüşe kavuşabilirsiniz.",
      },
    ],
  },
  {
    slug: "ikinci-el-arac-ekspertiz-neden-onemli",
    title: "İkinci El Araç Alırken Ekspertiz Neden Şart?",
    description:
      "Alım öncesi araç ekspertizi gizli hasarı ve boyayı ortaya çıkarır. İstanbul'da güvenli ikinci el alımı için ekspertiz rehberi.",
    date: "2026-03-30",
    readMins: 5,
    tag: "Ekspertiz",
    body: [
      {
        t: "p",
        x: "İkinci el araçta en büyük risk, gözle görünmeyen hasarlardır. Birkaç yüz liralık ekspertiz, on binlerce liralık sürprizden korur. Alım öncesi mutlaka bağımsız bir ekspertiz yaptırın.",
      },
      { t: "h2", x: "Ekspertizde neler kontrol edilir?" },
      {
        t: "ul",
        x: [
          "Boya ve hasar ölçümü (her panelde boya kalınlığı)",
          "Şasi ve kaporta bütünlüğü",
          "Motor ve şanzıman durumu, kaçak kontrolü",
          "OBD ile elektronik arıza taraması",
          "Süspansiyon, fren ve lastik durumu",
        ],
      },
      { t: "h2", x: "Bağımsız ekspertizin avantajı" },
      {
        t: "p",
        x: "Satıcının değil, sizin adınıza yapılan tarafsız bir kontrol, gerçek durumu şeffaf biçimde ortaya koyar. Çiğdem Servis'te 0–100 detaylı ekspertizle aracın boya-hasar geçmişini ve mekanik durumunu yazılı raporla sunarız.",
      },
    ],
  },
];

export const postBySlug = (slug: string) => posts.find((p) => p.slug === slug);
