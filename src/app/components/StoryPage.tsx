import { useState, useEffect } from "react";
import { ArchiveCalendar } from "./ArchiveCalendar";
import { REPORTS_BY_SPEAKER, resolveReportImageCandidates } from "./CalendarPage"; 
import Header from "./Header";
import ScrollHint from "./ScrollHint";
import type { NavPage } from "../types/navigation";

const FONT_TC   = "var(--font-qijic)";
const FONT_NOTO = "'Noto Sans', 'Helvetica Neue', Arial, sans-serif";
const FONT_MONO = "'DM Mono','Courier New',monospace";
const BLUE      = "#78C2C4";
const BG        = "#07070d";
const FG        = "#ededf0";
const FG_MUTED  = "rgba(237,237,240,0.42)";
const BORDER    = "rgba(255,255,255,0.07)";

export type SpeakerId = "1-1" | "2-0" | "3-0" | "4-0"; 

const SPEAKER_DATA: Record<SpeakerId, {
  name: string; honorific: string; institution: string; topic: string; portrait: string;
  tags: string[]; essayTitle: string; essayParas: string[]; themeId: number; themeIndex: string; themeTitle: string; themeTag: string; bgImage: string;
}> = {
  "1-1": {
    name: "孟祥瀚", honorific: "退休教授", institution: "國立中興大學歷史學系", topic: "交通發展",
    portrait: "https://ws.th.gov.tw/002/TH/new_site/upload/show/2a757d4d76238f0d6b0006c42b2e116e.jpg",
    tags: ["台東交通史", "鐵路發展", "更生日報地方要聞"],
    essayTitle: "百年來東線鐵路的發展",
    essayParas: [
      "東線鐵路於大正15年（1926）3月25日全線通車，迄今適逢百年。東部地區地形南北狹長，內部交通主要沿縱谷南北而行，對外則依賴花蓮與臺東轉運，路途遙遠，每多不便。鐵路開通後，人員貨物往來便捷，車站一帶頓形繁榮，人口聚集，市肆依傍而生，商貿因之而起。於是在熙來攘往之間，搭乘火車早已成為民眾生命記憶的一環。",
      "回顧百年來東線鐵路的發展，大致可分為三個階段。",
      "一、全線通車至民國60年間。日治時期東線鐵路係以當時臺灣糖業鐵路的標準興建，不僅軌距較窄，且採27公斤路軌，運輸量能有限，並時遭颱風豪雨侵襲，路基路軌流失，交通時而受阻。戰後初期，在有限的資源下，努力維護既有鐵路，並引入柴油車輛，開行光華號特快車等，以增加運能。但是受限於既有的規模，運量運能未能大幅提升，已無法滿足東部地區社會經濟發展的需求，改善鐵路設施已迫在眉睫。",
      "二、民國62年至民國80年間，攸關東部發展的三大鐵路建設陸續完工，為東線鐵路脫胎換骨的階段。",
      "民國62年（1973），北迴鐵路開工，自蘇澳新站起，北接宜蘭線，南過立霧溪後，至田浦與東線鐵路銜接，再延伸至花蓮新站。民國69年（1980）2月1日，舉行通車典禮。",
      "民國66年（1977），進行東線鐵路拓寬工程，全線軌距拓寬為1.067公尺，與西部鐵路軌距相同，並改換37公斤鋼軌，降低路線坡度，新闢河底隧道等，運能與安全性大幅提升。民國74年（1985）元旦完工。",
      "民國69年（1980）7月，南迴鐵路開工，自屏東線之枋寮站起，橫越中央山脈尾稜，經東海岸至臺東新站，銜接東線鐵路。民國80年（1991）12月，通車典禮同時於臺東新站與屏東枋寮站舉行。",
      "上述三大鐵路工程完工後，於焉完成。東部民眾可藉由北迴鐵路與南迴鐵路直達臺北與高雄，大幅縮短東西部間的距離，多年來建設環島鐵路網的理想也終於實現。花蓮新站與臺東新站作為出入東部的樞紐，腹地寬廣，形成新的發展區域。隨著北迴鐵路與東線拓寬工程的施工，或基於工程規畫的考量，或是基於地方社會經濟人口情勢的改變，先後撤廢10餘處站點，日治時期以來的鐵路風貌遭逢巨大的改變。北迴鐵路與南迴鐵路沿線海景風光，成為沿途亮點，隨著臺灣觀光風潮的興起，北迴、南迴與東線三條鐵路迅速成為熱門的景觀路線，帶動當地的旅遊事業。",
      "三、民國80年迄今，為東線鐵路持續精進改善的階段。",
      "北迴鐵路完工後，民眾搭乘需求大增，為改善一票難求的情況，改善相關設施，增加運能實為關係地方發展的當務之急。民國81年（1992）12月，將包括宜蘭線、北迴線與花東線等連通東部地區各線的鐵路加以優化，如北迴線擴建為雙軌、宜蘭線與北迴線改設電氣化，以及各線抽換為50公斤重軌與號誌自動化、增購電力機車、冷氣客車與貨車等。全部工程於民國93年（2004）12月完工，大幅提升路線容量與縮短行車時間。",
      "民國97年（2008），進行花蓮至知本之間全線電氣化工程，並將瓶頸路段與隧道鋪設雙軌，關山至月美路段截彎取直等。民國107年（2018）6月完工。同時，進行西起屏東線潮州，連接南迴線的電氣化工程，以及沿線土木與機電設備之配合改善等。民國109年（2020）12月正式通車營運，完成環島鐵路電氣化工程的最後一哩路，臺灣的鐵路建設邁入新的里程。",
      "東線鐵路除了軌道等硬體設施持續改善外，也注重改善站體與周邊環境，以提供舒適的候車環境，與促進鐵路沿線地方的繁榮。民國98年（2009）至民國108年（2019）間，完成新城至臺東間27個車站改建及週邊附屬設施的改善工程。各站站體之設計融合當地人文與自然特色，結合地方觀光與產業資源，成為地方的觀光門戶。",
      "目前，正在進行臺東線全面雙軌化工程，以縮短行車時間，增加班次，除滿足地方旅運的需求外，亦期帶動東部地區的觀光與事業。",
      "鐵路建設艱鉅複雜，耗時曠日，非數十年難見其功，正可謂是前人種樹，後人乘涼的典範。東線鐵路歷經百年，無論是作為通往外面世界的起點，或是返鄉的終點，始終扮演著交通尖兵的角色，也將持續成為推動東部發展的運轉力量。",
      "（撰稿：孟祥瀚。參考資料：《臺灣鐵路百周年紀念》（1988）、《東部鐵路改善計畫工程輯要》（2005）、交通部鐵道局網頁）"
    ],
    themeId: 1, themeIndex: "01", themeTitle: "山海之間的生活節奏", themeTag: "地方要聞",
    bgImage: "https://images.unsplash.com/photo-1610859250485-31443500f8c6?w=1920&h=1080&fit=crop&auto=format"
  },
  "2-0": {
    name: "徐千惠", honorific: "老師", institution: "國立台東高中退休教師", topic: "台東兒童文學發展", 
    portrait: "https://scontent.ftpe8-4.fna.fbcdn.net/v/t39.30808-6/651170369_26603754445922869_2724252160407163222_n.jpg?stp=dst-jpg_tt6&cstp=mx1357x2048&ctp=s1357x2048&_nc_cat=104&ccb=1-7&_nc_sid=cf85f3&_nc_ohc=blYpYy5KFVUQ7kNvwHEZOFZ&_nc_oc=Adr4-5IirUd8wDZj5OhrZT_QbgNvkRW62Pd2VZTUWxHHIJ4Jwn-eiZMMNy5R5_Lokx2uMjQWEYnJahRmeqwS28qT&_nc_zt=23&_nc_ht=scontent.ftpe8-4.fna&_nc_gid=k_HTYuPNbJswa4hNn1IuyQ&_nc_ss=7b2a8&oh=00_Af8fk7bxT5XDChyu2fIubwezdtTZXdU7jmrVCOY-3gQryQ&oe=6A3630EC",
    tags: ["兒童文學", "童詩推廣", "副刊文藝"],
    essayTitle: "童心看家鄉：更生日報裡的台東兒童文學記憶",
    essayParas: [
      "更生日報創刊於民國三十六年（1947 年），七十餘年來，這份報紙的文藝副刊開闢了珍貴的兒少文學專欄。老剪報裡記載著一首首台東孩子們手寫的童詩與散文，這些樸實而純真的文字字句，不僅留住了東台灣最乾淨的生活切面，更為台東培育了無數文學新苗。"
    ],
    themeId: 2, themeIndex: "02", themeTitle: "地方藝文與文化人", themeTag: "文化藝術", 
    bgImage: "https://images.unsplash.com/photo-1601482919158-1af01b70a427?w=1920&h=1080&fit=crop&auto=format"
  },
  "3-0": {
    name: "許秀孟", honorific: "教授", institution: "國立台東大學文化資源與休閒產業學系", topic: "魚苗與香茅",
    portrait: "https://nrchisp.nttu.edu.tw/var/file/63/1063/img/674163412.jpg",
    tags: ["台東產業史", "魚苗養殖", "香茅農業"],
    essayTitle: "魚苗與香茅：更生日報裡的台東產業風景",
    essayParas: [
      "更生日報創刊於民國三十六年（1947 年），是台灣東部歷史最悠久的地方報紙。魚苗養殖曾經是台東沿海地區的重要產業，香茅則在山區廣泛種植，是重要的經濟作物。這些產業的興衰被老報紙一一如實記錄，觸摸到那個年代拼搏的生活肌理。"
    ],
    themeId: 3, themeIndex: "03", themeTitle: "地方特色產業發展", themeTag: "產業史",
    bgImage: "https://images.unsplash.com/photo-1694005892433-7c810c1e54ae?w=1200&h=800&fit=crop&auto=format"
  },
  "4-0": {
    name: "劉烱錫", honorific: "主任", institution: "國立台東大學友善環境農漁產業發展中心", topic: "原住民族部落永續發展", 
    portrait: "https://ils.nttu.edu.tw/var/file/20/1020/img/423586424.jpg",
    tags: ["原住民文化", "傳統祭典", "民俗信仰"],
    essayTitle: "當世界快步向前走，為何開始回頭向部落學習慢生活？",
    essayParas: [
      "過去兩百多年來，人類一直相信自己正在進步。從蒸汽機、工業革命、民主制度，到資訊科技與人工智慧，我們創造了前所未有的物質繁榮。城市越來越大，交通越來越快，科技越來越進步。然而，在繁榮的背後，人類也面臨氣候變遷、生物多樣性流失、環境污染、精神焦慮與社會疏離等問題。這使我們不得不重新思考：究竟什麼是真正的進步？",
      "長久以來，人們習慣將人類社會區分為『文明』與『部落』。所謂文明（Civilization），其語源與城邦、公民共同體有關，後來逐漸被用來指稱以城市聚落、國家制度、文字系統及高度社會分工為基礎的大型社會組織。然而，隨著城邦與帝國興起，許多社會也逐漸發展出階級分化、奴役制度、封建體系與權力集中等現象。近代人權思想的興起，其實正是對這些弊病的修正。十七世紀洛克受聖經的啟發，提出天賦人權觀念，認為每個人都擁有不可剝奪的生命、自由與財產權利。後來，美國獨立運動、黑奴解放運動以及反種族歧視運動，都延續了這條思想路線。",
      "然而，當個人權利逐漸受到保障後，人類又面臨另一項挑戰：人與自然的關係脫序了。森林被砍伐，河川被污染，海洋充滿塑膠垃圾，氣候變遷威脅未來世代。於是，人們開始重新尋找答案。",
      "令人驚訝的是，答案竟出現在許多曾被視為落後的部落文化之中。電影《與狼共舞》與《阿凡達》之所以感動世界，不只是因為故事精彩，更因為它們觸動現代人內心深處對土地、自然與生命連結的渴望。",
      "三十多年前，我開始在臺東各原住民族部落進行生態與文化調查。從許多受殖民教育影響較少的耆老身上，我逐漸發現，他們的世界觀並非以個人為中心，而是在敬畏造物主之下，以生命共同體為中心。土地不是商品，而是祖先留下來的生命空間；河川不是資源，而是部落生命的一部分；森林、海洋、動植物不是等待開發的財富，而是共同生活的夥伴。",
      "臺東至今仍保存許多活著的生命共同體文化。卑南族文化便是一個鮮明例子。以木雕工藝被文化部登錄為重要傳統工藝保存者的射馬干部落頭目哈古（陳文生）先生，曾表示自己是第六十九代頭目。知本部落與射馬干部落至今仍自稱為姊弟部落。日本時代人類學家馬淵東一所記錄的部落系譜，也可追溯六十多代。如此在一個地方可如此長久生存的治理體系，在人類社會實屬罕見。",
      "對許多卑南族部落而言，歷史不只是寫在書本裡，更存在於土地之中。地質學者稱為『利吉惡地』的泥岩地形，在普悠瑪部落的口傳歷史裡，卻是神聖的祖居地，洪水傳說、兩兄弟放風箏以及卑南溪形成的故事，都與這片土地緊密相連。地景不只是地景，而是一部活著的歷史書。",
      "高山的布農族流傳著射日神話。傳說古時因人類失序而出現兩個太陽，後來祖先射落其中一個，成為今日的月亮。月亮後來成為造物主與人立約的象徵，也提醒人們遵守土地倫理與生活規範。令人流連忘返的嘉明湖映照著月亮，因此被稱為『月亮的鏡子』，成為人與土地關係的重要象徵。",
      "而在中央山脈東側的山腰地帶，排灣族與魯凱族世代建立的石板家屋聚落，不只是建築形式，更反映出人與山林長期共存的生活哲學。這些聚落依山勢而建，運用在地石材形成冬暖夏涼的生活空間。長期穩定的聚落生活，也孕育出優美的歌謠及豐富的雕刻、編織、花環、琉璃珠等視覺藝術文化。許多國際旅人來到臺東，驚嘆的不只是自然景觀，更是這些文化所展現的生命厚度。",
      "另一方面，臺東東海岸也保存著珍貴的海洋文化。十多年來，我持續投入阿美族竹筏帆船文化重建工作。從耆老訪談、歷史文獻蒐集，到竹材、帆具與航海技術研究，逐步重建臺灣東海岸曾經存在的航海文化。2024年我們已成功完成綠島航線測試，證明竹筏帆船並非只是想像中的原始工具，而是具有實際航行能力的海洋技術。未來若能結合臺東博覽會等活動，讓遊客實際搭乘竹筏帆船體驗乘風破浪的感受，不只是觀光，更是理解阿美族海洋文化與南島民族遷移的人類大歷史。",
      "遺憾的是，近代國家治理往往習慣將原住民視為個體，而非部落生命共同體。許多問題被歸因於個人或家庭失能，卻忽略了部落治理、土地關係與文化傳承被破壞的歷史背景。當生命共同體瓦解後，原本由部落承擔的教育、照顧與文化傳承功能也逐漸削弱。因此，原住民族文化復振不應只是歌舞展演或文化保存，而應重新思考如何恢復部落作為生命共同體的功能。這不只是原住民族的課題，也可能是全人類面對未來的重要課題。",
      "或許，臺東最珍貴的資產不是風景，而是仍然活著的原住民文化。當世界面臨氣候變遷、生態危機、精神焦慮與社會疏離時，臺東的部落文化提醒我們：真正的進步，不只是科技更先進、城市更龐大，而是人能否重新找回與家族、社群、土地、自然及造物主的連結。",
      "從卑南族的千古部落、布農族稱為『月亮的鏡子』之嘉明湖所象徵的土地倫理、阿美族的海洋文化，到排灣族與魯凱族的石板聚落，臺東保存的不只是文化資產，更可能是人類面向未來的重要答案。當全球都在尋找永續發展的道路時，臺東或許不只是西臺灣人的後山，而是世界的明日。"

    ],
    themeId: 4, themeIndex: "04", themeTitle: "祖先文化與土地", themeTag: "民俗信仰",
    bgImage: "https://images.unsplash.com/photo-1568093706416-302fa653623c?w=1920&h=1080&fit=crop&auto=format"
  }
};

const toStoryMediaPath = (folderName: string, fileName: string) => `/story-media/${encodeURIComponent(folderName)}/${encodeURIComponent(fileName)}`;

const MEDIA_BY_THEME: Record<number, { src: string; thumb: string; caption: string }[]> = {
  1: [
   {
      src: toStoryMediaPath("孟祥瀚", "台東舊火車站（今台東轉運站）.jpg"),
      thumb: toStoryMediaPath("孟祥瀚", "台東舊火車站（今台東轉運站）.jpg"),
      caption: "台東舊火車站（今台東轉運站）"
    },
    {
      src: toStoryMediaPath("孟祥瀚", "民國71年南下最後的光華號列車人員在玉里站合影留念.jpg"),
      thumb: toStoryMediaPath("孟祥瀚", "民國71年南下最後的光華號列車人員在玉里站合影留念.jpg"),
      caption: "民國71年南下最後的光華號列車人員在玉里站合影留念"
    },
    {
      src: toStoryMediaPath("孟祥瀚", "花東線火車路牌拋接.jpg"),
      thumb: toStoryMediaPath("孟祥瀚", "花東線火車路牌拋接.jpg"),
      caption: "花東線火車路牌拋接"
    }
  ],
  2: [
    { src: "https://images.unsplash.com/photo-1601482919158-1af01b70a427?w=1200&h=800&fit=crop&auto=format", thumb: "https://images.unsplash.com/photo-1601482919158-1af01b70a427?w=200&h=140&fit=crop&auto=format", caption: "台東在地藝文展覽與文藝聚會現場，約 1970 年代。" },
  ],
  3: [
    { src: "https://images.unsplash.com/photo-1694005892433-7c810c1e54ae?w=1200&h=800&fit=crop&auto=format", thumb: "https://images.unsplash.com/photo-1694005892433-7c810c1e54ae?w=200&h=140&fit=crop&auto=format", caption: "台東農業水圳灌溉系統，產業發展景況，約 1955 年。" },
  ],
  4: [
    {
      src: toStoryMediaPath("劉烱錫", "2015.4.1 利稻長老教會卡法司牧師帶領長榮大學布農族團契為高山湖泊取名Cinanuma buan (月亮的鏡子).jpg"),
      thumb: toStoryMediaPath("劉烱錫", "2015.4.1 利稻長老教會卡法司牧師帶領長榮大學布農族團契為高山湖泊取名Cinanuma buan (月亮的鏡子).jpg"),
      caption: "利稻長老教會卡法司牧師帶領長榮大學布農族團契為高山湖泊取名Cinanuma buan (月亮的鏡子)"
    },
    {
      src: toStoryMediaPath("劉烱錫", "在台東縣金峰鄉嘉蘭村重建的霧台鄉好茶部落魯凱族石板家屋.jpg"),
      thumb: toStoryMediaPath("劉烱錫", "在台東縣金峰鄉嘉蘭村重建的霧台鄉好茶部落魯凱族石板家屋.jpg"),
      caption: "在台東縣金峰鄉嘉蘭村重建的霧台鄉好茶部落魯凱族石板家屋"
    },
    {
      src: toStoryMediaPath("劉烱錫", "阿美族竹筏帆船.jpg"),
      thumb: toStoryMediaPath("劉烱錫", "阿美族竹筏帆船.jpg"),
      caption: "阿美族竹筏帆船"
    }
  ],
};

interface Props {
  speakerId:  SpeakerId;
  onBack:     () => void;
  onNavigate: (page: NavPage, themeId?: number, speakerId?: string) => void;
}

export function StoryPage({ speakerId, onBack, onNavigate }: Props) {
  const [localReportIndex, setLocalReportIndex] = useState(0);
  const [activeImg, setActiveImg] = useState(0); 
  const sp = SPEAKER_DATA[speakerId];
  
  const speakerReports = REPORTS_BY_SPEAKER[speakerId] ?? [];
  const currentReport = speakerReports[localReportIndex];
  const media = MEDIA_BY_THEME[sp.themeId] ?? [];
  const [resolvedPreviewImage, setResolvedPreviewImage] = useState("/news/placeholder-newspaper.svg");
  const [resolvedFullImage, setResolvedFullImage] = useState("/news/placeholder-newspaper.svg");
  const [resolvedImageCandidates, setResolvedImageCandidates] = useState<string[]>([]);
  const [isPreviewImageLoading, setIsPreviewImageLoading] = useState(false);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    setLocalReportIndex(0);
    setActiveImg(0);
  }, [speakerId]);

  useEffect(() => {
    let cancelled = false;

    setIsPreviewImageLoading(true);
    setResolvedImageCandidates([]);
    setResolvedPreviewImage("/news/placeholder-newspaper.svg");
    setResolvedFullImage("/news/placeholder-newspaper.svg");

    if (!currentReport) {
      setIsPreviewImageLoading(false);
      return () => {
        cancelled = true;
      };
    }

    const loadCandidates = async () => {
      try {
        const candidates = await resolveReportImageCandidates(sp.name, currentReport.date);
        if (!cancelled) {
          setResolvedImageCandidates(candidates);
          setResolvedPreviewImage(candidates[0] ?? "/news/placeholder-newspaper.svg");
          setResolvedFullImage(candidates[0] ?? "/news/placeholder-newspaper.svg");
        }
      } finally {
        if (!cancelled) {
          setIsPreviewImageLoading(false);
        }
      }
    };

    void loadCandidates();

    return () => {
      cancelled = true;
    };
  }, [currentReport, sp.name]);

  return (
    <div style={{ fontFamily: FONT_NOTO, background: BG, color: FG, minHeight: "100vh", position: "relative" }}>
      <style>{`
        @font-face { font-family: 'QIJIC'; src: url('./fonts/qiji-combo.ttf') format('truetype'); font-weight: normal; font-style: normal; font-display: swap; }
        .qijic-font-render { font-family: 'QIJIC', ${FONT_TC} !important; }
      `}</style>

      <div style={{ position: "relative", zIndex: 1 }}>
        <ScrollHint label="往下滑看報導與影像" />
        <Header current="speaker" onNavigate={onNavigate} />

        {/* TITLE */}
        <div style={{ paddingTop: isMobile ? 30 : 40, borderBottom: `1px solid ${BORDER}` }}>
          <div style={{ padding: "24px 40px" }}>
            <span style={{ fontFamily: FONT_MONO, fontSize: "0.9rem", color: BLUE, textTransform: "uppercase" }}>
              THEME {sp.themeIndex} · {sp.themeTitle} · {sp.topic}
            </span>
            <h1 className="qijic-font-render" style={{ fontWeight: 400, fontSize: isMobile ? "1.5rem" : "2.4rem", margin: "6px 0 0", letterSpacing: "0.04em", lineHeight: 1.35 }}>
              {sp.essayTitle}
            </h1>
          </div>
        </div>

        {/* 雙欄主架構 */}
        <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", minHeight: "70vh" }}>
          
          {/* 行動端頂部插圖 */}
          {isMobile && media.length > 0 && (
            <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
              <div style={{ position: "relative", overflow: "hidden", background: "#0d0d1a", aspectRatio: "16 / 10" }}>
                <img src={media[activeImg].src} alt="歷史影像" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "16px 20px", zIndex: 6 }}>
                  <p style={{ fontFamily: FONT_NOTO, fontSize: "0.9rem", color: "rgba(255,255,255,0.85)", lineHeight: 1.5, margin: 0 }}>{media[activeImg].caption}</p>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, padding: "12px 20px", borderBottom: `1px solid ${BORDER}`, overflowX: "auto", background: "rgba(255,255,255,0.01)" }}>
                {media.map((m, i) => (
                  <button key={i} onClick={() => setActiveImg(i)} style={{ width: 64, height: 44, padding: 0, border: "none", cursor: "pointer", flexShrink: 0, outline: activeImg === i ? `2px solid ${BLUE}` : "none" }}>
                    <img src={m.thumb} alt="縮圖" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 左側：講者內文 */}
          <div style={{ width: isMobile ? "100%" : "45%", flexShrink: 0, borderRight: isMobile ? "none" : `1px solid ${BORDER}`, display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "24px 40px", borderBottom: `1px solid ${BORDER}`, background: "rgba(255,255,255,0.01)" }}>
              <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
                <img src={sp.portrait} alt={sp.name} style={{ width: 60, height: 60, borderRadius: "50%", objectFit: "cover", border: `1px solid ${BORDER}` }} />
                <div>
                  <p style={{ margin: 0, color: FG, display: "flex", alignItems: "baseline" }}>
                    <span className="qijic-font-render" style={{ fontWeight: 400, marginRight: 8, fontSize: "1.6rem" }}>{sp.name}</span>
                    <span style={{ fontFamily: FONT_NOTO, fontSize: "0.95rem", color: FG_MUTED }}>{sp.honorific}</span>
                  </p>
                  <p style={{ margin: 0, fontSize: "0.9rem", color: FG_MUTED, fontFamily: FONT_NOTO }}>{sp.institution}</p>
                </div>
              </div>
            </div>
            <div style={{ padding: "34px 40px", flex: 1 }}>
              {sp.essayParas.map((p, i) => (
                <p key={i} style={{ fontFamily: FONT_NOTO, fontSize: "1.05rem", lineHeight: 1.9, color: "rgba(237,237,240,0.85)", marginBottom: "1.2em", textAlign: "justify" }}>{p}</p>
              ))}
            </div>
          </div>

          {/* 桌機端：右側大插圖面板與縮圖列 */}
          {!isMobile && media.length > 0 && (
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <div style={{ flex: 1, position: "relative", overflow: "hidden", background: "#0d0d1a" }}>
                <img src={media[activeImg].src} alt="歷史影像" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.76) 0%, transparent 52%)" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 28px 22px", zIndex: 6 }}>
                  <p style={{ fontFamily: FONT_NOTO, fontSize: "1.05rem", color: "rgba(255,255,255,0.85)", lineHeight: 1.6, margin: 0 }}>{media[activeImg].caption}</p>
                </div>
              </div>
              <div style={{ padding: "12px 18px", borderTop: `1px solid ${BORDER}`, background: "rgba(255,255,255,0.02)", display: "flex", gap: 8 }}>
                {media.map((m, i) => (
                  <button key={i} onClick={() => setActiveImg(i)} style={{ width: 70, height: 50, padding: 0, border: "none", cursor: "pointer", overflow: "hidden", background: "#1a1a2a", outline: activeImg === i ? `2px solid ${BLUE}` : "none" }}>
                    <img src={m.thumb} alt="縮圖" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 自動調閱系統區塊 */}
        <div style={{ borderTop: `2px solid ${BORDER}`, background: "rgba(255,255,255,0.01)" }}>
          <div style={{ 
            padding: "24px 40px", 
            borderBottom: `1px solid ${BORDER}`, 
            display: "flex", 
            flexDirection: isMobile ? "column" : "row", 
            justifyContent: "space-between", 
            alignItems: isMobile ? "flex-start" : "center",
            gap: isMobile ? 16 : 0
          }}>
            <div>
              <h2 className="qijic-font-render" style={{ fontWeight: 400, fontSize: "1.6rem", color: FG, margin: 0, letterSpacing: "0.05em" }}>更生日報 時空自動調閱系統</h2>
              <p style={{ fontFamily: FONT_NOTO, fontSize: "0.85rem", color: FG_MUTED, margin: "4px 0 0" }}>日曆已自動鎖定老師推薦的歷史報導</p>
            </div>
            <button 
              onClick={() => onNavigate("calendar", sp.themeId)} 
              style={{ 
                fontFamily: FONT_NOTO, 
                fontSize: "0.85rem", 
                background: "transparent", 
                border: `1px solid ${BLUE}`, 
                color: BLUE, 
                padding: "10px 14px", 
                cursor: "pointer", 
                borderRadius: 4,
                width: isMobile ? "100%" : "auto",
                textAlign: "center"
              }}
            >
              前往完整時空調閱系統 →
            </button>
          </div>

          {currentReport ? (
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "380px 1fr", minHeight: 440 }}>
              {/* 左日曆 */}
              <div style={{ padding: "36px 40px", borderRight: isMobile ? "none" : `1px solid ${BORDER}`, display: "flex", flexDirection: "column", gap: 20 }}>
                <ArchiveCalendar targetYear={currentReport.year} targetMonth={currentReport.month} targetDay={currentReport.day} />
                <div style={{ display: "flex", gap: 12, justifyContent: "space-between" }}>
                  <button onClick={() => localReportIndex > 0 && setLocalReportIndex(localReportIndex - 1)} disabled={localReportIndex === 0} style={{ flex: 1, padding: "10px", borderRadius: 6, border: `1px solid ${localReportIndex === 0 ? "rgba(255,255,255,0.05)" : BLUE}`, background: "transparent", color: localReportIndex === 0 ? "rgba(255,255,255,0.2)" : BLUE, cursor: "pointer", fontFamily: FONT_NOTO }}>← 上一則</button>
                  <button onClick={() => localReportIndex < speakerReports.length - 1 && setLocalReportIndex(localReportIndex + 1)} disabled={localReportIndex === speakerReports.length - 1} style={{ flex: 1, padding: "10px", borderRadius: 6, background: localReportIndex === speakerReports.length - 1 ? "transparent" : BLUE, color: localReportIndex === speakerReports.length - 1 ? "rgba(255,255,255,0.2)" : BG, border: "none", cursor: "pointer", fontWeight: 600, fontFamily: FONT_NOTO }}>下一則 →</button>
                </div>
                <div style={{ textAlign: "center", fontFamily: FONT_MONO, fontSize: "0.78rem", color: FG_MUTED }}>篇數 {localReportIndex + 1} / {speakerReports.length}</div>
              </div>

              <div style={{ padding: "36px 52px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", borderBottom: `1px solid ${BORDER}`, paddingBottom: 14, marginBottom: 20 }}><span style={{ fontFamily: FONT_MONO, color: BLUE, fontSize: "1.05rem" }}>報導日期：{currentReport.date}</span></div>
                  <h3 style={{ fontFamily: FONT_NOTO, fontSize: "1.7rem", fontWeight: 700, color: FG, margin: "0 0 12px 0", lineHeight: 1.4 }}>{currentReport.title}</h3>
                  <div style={{ fontSize: "0.92rem", color: BLUE, marginBottom: 20, fontFamily: FONT_NOTO }}>本報記者：{currentReport.reporter}</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 24, alignItems: "stretch" }}>
                    <div style={{ flex: "1 1 min(50%, 360px)", minWidth: 0, borderTop: `1px solid ${BORDER}`, paddingTop: 16, fontSize: "1.0rem", color: "rgba(237,237,240,0.8)", lineHeight: 1.7, fontFamily: FONT_NOTO, whiteSpace: "normal", wordBreak: "break-word" }}><span style={{ display: "block", color: FG_MUTED, fontSize: "0.95rem", marginBottom: 6, fontWeight: 700 }}>報導摘要大綱</span>{currentReport.summary}</div>
                    <button
                      disabled={isPreviewImageLoading || !currentReport}
                      onClick={async () => {
                        if (isPreviewImageLoading || !currentReport) {
                          return;
                        }

                        const initialImageCandidates = resolvedImageCandidates.length > 0
                          ? resolvedImageCandidates
                          : [resolvedPreviewImage];
                        const firstImage = initialImageCandidates[0] ?? "/news/placeholder-newspaper.svg";
                        const imagesParam = encodeURIComponent(JSON.stringify(initialImageCandidates));
                        const previewWindow = window.open(`/newspaper-preview.html?src=${encodeURIComponent(firstImage)}&images=${imagesParam}&page=speakerProfile&speakerId=${speakerId}&reportDate=${encodeURIComponent(currentReport.date)}`, "_blank", "noopener,noreferrer");

                        if (!previewWindow) {
                          return;
                        }

                        const imageCandidates = resolvedImageCandidates.length > 0
                          ? resolvedImageCandidates
                          : await resolveReportImageCandidates(sp.name, currentReport.date);

                        setResolvedImageCandidates(imageCandidates);
                        setResolvedPreviewImage(imageCandidates[0] ?? "/news/placeholder-newspaper.svg");

                        setTimeout(() => {
                          previewWindow.postMessage({
                            type: "preview-images",
                            images: imageCandidates,
                            page: "speakerProfile",
                            speakerId,
                            reportDate: currentReport.date,
                          }, window.location.origin);
                        }, 120);
                      }}
                      style={{
                        flex: "1 1 min(50%, 360px)",
                        minWidth: 0,
                        width: isMobile ? "100%" : "100%",
                        padding: 0,
                        border: `1px solid ${BORDER}`,
                        background: "rgba(255,255,255,0.03)",
                        borderRadius: 12,
                        overflow: "hidden",
                        cursor: isPreviewImageLoading ? "wait" : "pointer",
                        textAlign: "left",
                        color: FG,
                        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
                        opacity: isPreviewImageLoading ? 0.9 : 1
                      }}
                    >
                      <div style={{ position: "relative", width: "100%", height: 180, background: "linear-gradient(135deg, rgba(120,194,196,0.16), rgba(255,255,255,0.04))", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {isPreviewImageLoading ? (
                          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, textAlign: "center", padding: "0 16px" }}>
                            <div style={{ width: 36, height: 36, borderRadius: "50%", border: `3px solid rgba(120, 194, 196, 0.24)`, borderTopColor: BLUE, animation: "spin 0.9s linear infinite" }} />
                            <div style={{ fontFamily: FONT_NOTO, color: FG, fontWeight: 700, fontSize: "0.92rem" }}>圖像載入中</div>
                          </div>
                        ) : (
                          <img src={resolvedPreviewImage} alt={`報紙預覽：${currentReport.title}`} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                        )}
                      </div>
                      <div style={{ padding: "10px 12px", fontFamily: FONT_NOTO, fontSize: "0.92rem", color: FG, borderTop: `1px solid ${BORDER}` }}>
                        <div style={{ fontWeight: 700, color: BLUE, marginBottom: 4 }}>{isPreviewImageLoading ? "資料整理中" : "開啟報紙預覽"}</div>
                        <div style={{ color: FG_MUTED, fontSize: "0.84rem" }}>{isPreviewImageLoading ? "請稍候，系統正在載入該日期報導對應圖像" : "點擊可查看完整報紙圖片內容"}</div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ padding: 40, textAlign: "center", color: FG_MUTED, fontFamily: FONT_NOTO }}>本單元暫無綁定文獻</div>
          )}
        </div>
      </div>
    </div>
  );
}