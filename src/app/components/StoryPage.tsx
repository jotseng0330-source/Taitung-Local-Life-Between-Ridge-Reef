import { useState, useEffect } from "react";
import { ArchiveCalendar } from "./ArchiveCalendar";
import { REPORTS_BY_SPEAKER, useReportImageResolver, openNewspaperPreview } from "./CalendarPage"; 
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
      "上述三大鐵路工程完工後，東部民眾可藉由北迴鐵路與南迴鐵路直達臺北與高雄，大幅縮短東西部間的距離，多年來建設環島鐵路網的理想也終於實現。花蓮新站與臺東新站作為出入東部的樞紐，腹地寬廣，形成新的發展區域。隨著北迴鐵路與東線拓寬工程的施工，或基於工程規畫的考量，或是基於地方社會經濟人口情勢的改變，先後撤廢10餘處站點，日治時期以來的鐵路風貌遭逢巨大的改變。北迴鐵路與南迴鐵路沿線海景風光，成為沿途亮點，隨著臺灣觀光風潮的興起，北迴、南迴與東線三條鐵路迅速成為熱門的景觀路線，帶動當地的旅遊事業。",
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
    portrait: "/portraits/徐千惠.jpg",
    tags: ["兒童文學", "童詩推廣", "副刊文藝"],
    essayTitle: "「後山文學獎」與「後山文學營」",
    essayParas: [
      "花東地區山海秀麗、人文薈萃、族群交融，遂孕育出文化的多樣面貌，例如祭典、歌曲、舞蹈、繪畫、雕刻、編織、陶藝與文學等。本篇文章將以「後山文學獎」與「後山文學營」為例，介紹這兩項深耕花東地區文學創作的重要活動。",
      "「後山文學獎」成立於2009年（民國98年），由文化部指導、國立台東生活美學館主辦。初始是針對花東地區舉辦的徵文活動，並在暑假期間，由地方藝文人士針對高中職學生辦理3天2夜的「後山文學營」，藉由動靜相間的活動形式鼓勵年輕學員走出校園，置身於台東豐富的山海景色、多元族群及人文特質中，吸納各種文化元素化為個人創作的底蘊。",
      "2019年（民國108年），「後山文學獎」正式擴大辦理，包含「後山文學獎」及專為未曾出版紙本圖書的文壇寫作新秀設立之「後山文學年度新人獎」，並向全國廣為徵稿。",
      "「後山文學獎」成立初衷，希冀藉由鼓勵學子與社會大眾進行花東地區的文學創作，扎根和深耕當地文學土壤，推廣普羅大眾文學欣賞及寫作的風氣，並透過不同類型的作品來呈現花東地區自然地景與人文風貌，發掘和培植當地文學人才，且提供平台形塑台灣後山文學特色。因此參與的作品皆須以「花東地區」為書寫主題，內容不拘，如：人文歷史、多元族群、自然行旅、文化體驗、美食、母語學習、親情等。",
      "「後山文學獎」徵件分為社會組與青春組，總獎金豐厚，得獎者並獲頒獎狀乙紙。社會組以大專院校學生與社會人士為對象，分為短篇小說類（錄取5名，獎金2萬至10萬元）、新詩類（錄取5名，獎金1萬至6萬元）與兒童文學床邊故事類（錄取3名，獎金2萬至4萬元）三類。青春組則限年滿13至18歲，且於花東地區出生、設籍於花東地區或就讀花東地區學校的學生（三項條件中符合其中一項即可），分為散文類（錄取5名，獎金1萬至4萬元）與新詩類（錄取5名，獎金8,500元至3萬元）兩類。",
      "2021年（民國110年），「後山文學營」因受新冠疫情影響，曾停辦4年，直到2025年（民國114年），台東美學館才在台東縣池上鄉回復辦理，招收30名花東地區國高中學員，以落實文學寫作根基。2026年（民國115年），「後山文學營」於7月1日至3日在花蓮縣玉里鎮舉辦，以花東地區國高中30名學生為主，安排一系列講座與走讀活動，主辦單位帶領學員深入山林與地方場域，將旅途中的觀察與感受轉化為創作養分，在交流與分享中發掘屬於自己的創作視野。",
      "「一一五年後山文學獎」，仍持續以推廣大眾閱讀與寫作為核心理念，希冀透過豐富多元的活動形式，讓文學走入民眾的日常生活，培養大眾閱讀興趣與創作能量。此外，為深化文學與不同領域的交流，今年特別於花蓮地區規劃二場「一般大眾文學推廣講座」，邀請歷屆後山文學獎得主分享創作歷程與跨領域經驗，帶領民眾從不同視角感受文學的魅力。",
      "（撰稿：徐千惠。取材自國立台東生活美學館網站、更生新聞網）"
    ],
    themeId: 2, themeIndex: "02", themeTitle: "地方藝文與文化人", themeTag: "文化藝術", 
    bgImage: "https://images.unsplash.com/photo-1601482919158-1af01b70a427?w=1920&h=1080&fit=crop&auto=format"
  },
  "3-0": {
    name: "許秀孟", honorific: "博士後研究員", institution: "國立臺東大學人文創新與社會實踐中心", topic: "傳統產業發展",
    portrait: "https://nrchisp.nttu.edu.tw/var/file/63/1063/img/674163412.jpg",
    tags: ["台東產業史", "香茅與荖葉", "稻米與漁業"],
    essayTitle: "太平洋畔的芬芳：側看臺東物產六十年流變",
    essayParas: [
      "臺東，面迎太平洋的溫熱海風，背倚中央山脈與海岸山脈的環抱，在過去六十年間，透過這片山海孕育出的獨特氣味，構築一幅流動的感官地圖。從山風中飄散的香茅與荖葉辛香，到縱谷稻田中蒸騰的純粹米香，再到海風送來的潮浪鹹香與漁滋味，臺東的物產不只是經濟活動，還是這片土地韌性與創新的故事。",
      "臺東早期商業活動的頂峰，莫過於山區飄散的香茅清香。1960年後，臺灣香茅生產重心東移，1963年臺東縣香茅栽種面積達9,768公頃，正式成為全台最大產地。當時香茅精油出口量曾占全球市場七成以上，是僅次於茶、香蕉與鳳梨的第四大出口農產加工品。直到1982年因不敵國際化學合成香料的競爭，這段香茅傳奇才逐漸淡出。接續這份綠意與香氣的，是臺東另一項極具地方特色的作物──荖葉。荖葉於1976年從彰化永靖引進臺東，因臺東風土適宜，產出的荖葉精油含量多、香氣芬芳且葉片纖維厚實具彈性，深受市場青睞。時至今日，臺東縣的荖葉收穫量占全台81%，形成完整的產業鏈，臺東市周邊約有三分之一的農業用地被一層樓高的「黑網」覆蓋，形成了獨特的農業地景。儘管長期受限於社會對檳榔產業的既定觀念，但藥理研究證明荖葉具備良好的抗氧化與保肝活性，且不具致癌性，目前臺東正嘗試透過「產地旅行」與「荖葉美食」如精油與香皂的研發，讓這份山林間的辛辣芬芳轉化為更具主體性的文化體驗。",
      "當山林的香氣流轉，臺東平原的稻香則透過品牌化與品質精進，寫下新的篇章。1984年與1985年是池上米與關山米的關鍵轉折，受「中美食米協定」限制食米外銷影響，政策從追求「產量」轉向追求「品質」。1985年，池上被選為良質米產銷計畫的重點輔導區，開啟了池上米從「貢米」美名向「金米」地位邁進的精進運動。1997年伯朗咖啡廣告在池上取景，讓一望無際的稻田地景成為浪漫農村的代名詞。面對WTO加入後的衝擊與仿冒問題，池上鄉公所於2003年12月正式取得全台第一個「產地證明標章」，這套制度交揉了本土良質米標準與日本「MOA自然農法」的管理知識，確立了專業化與品質控制的治理模式。2004至2006年，池上米連續奪得三屆全國稻米競賽總冠軍，奠定了其在全台的霸主地位。2014年，「池上新開園老田區」登錄為文化景觀，將農民的勞動經驗與社區秩序，轉化為具備美學價值的品牌。",
      "臺東的果香味覺地圖，則是由晚崙西亞橙與鳳梨釋迦共同譜寫。晚崙西亞橙（又稱香丁）於1954年自美國引進臺東，因適應良好，1972年於卑南鄉成立專業區。它最特殊的感官特徵在於「三代同堂」——採收時花、小果與熟果並存，空氣中混合著濃郁花香與成熟果香，其生育期長達14個月，被譽為「台灣版的香吉士」。另一位主角鳳梨釋迦，則是於1965年自以色列引進試種，早年因夏期果易裂果而推廣不順，直到1993年，臺東農改場研發出「產期調節技術」，轉向生產冬期果，正式開啟產業化。鳳梨釋迦的維生素C含量高達檸檬的2.9倍，風味甜中帶酸。2021年，鳳梨釋迦輸出中國產值達到最高峰的14億元，卻隨即遭遇禁令，這促使臺東研發「全果冷凍」技術，推動「外銷、內銷、加工」三支箭轉型，讓釋迦不再只是生鮮，而是能走入國際通路的精品。",
      "海風中帶著鹹味的鮮甜，是臺東成功新港漁民最熟悉的氣味。鬼頭刀產值一度占臺東漁業的15至25%。2004年，成功新港成為鬼頭刀科學研究重鎮，透過「耳石」日週輪判讀，精確建立起資源管理基礎。2023年，因國際永續評級下降導致美方訂單縮減，產地價一度重挫，促使蘇澳、新港與東港三大漁會整合資源，落實數據透明化與溯源管理。2024年，台灣鬼頭刀獲得國際漁業改進計畫（FIP）最高A級評價，重新確立美國採購資格，產地價穩健回升。如今，鬼頭刀不僅是高附加價值的出口品，更走入臺東在地的國小營養午餐，深化在地的食魚教育。",
      "回首這六十年，臺東物產從原材料出口轉變為承載土地故事的精品。2021年臺東縣政府正式發布《慢經濟in臺東》2030政策白皮書，強調「快效率打造慢生活」，追求「一萬人來一百次」的深度旅遊與慢生活理念。在「慢經濟」的推動下，臺東的米、鳳梨釋迦、晚崙西亞與漁產是城市名片。物產的芬芳以深刻的文化厚度，在太平洋海風的吹拂下，持續向世界散發臺東獨有的、不可取代的精品魅力。"
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
    {
      src: toStoryMediaPath("徐千惠", "台東兒童故事館.jpg"),
      thumb: toStoryMediaPath("徐千惠", "台東兒童故事館.jpg"),
      caption: "台東兒童故事館"
    },
    {
      src: toStoryMediaPath("徐千惠", "臺東大學兒童文學研究所.jpg"),
      thumb: toStoryMediaPath("徐千惠", "臺東大學兒童文學研究所.jpg"),
      caption: "臺東大學兒童文學研究所"
    }
    ],
  3: [
    {
      src: toStoryMediaPath("許秀孟", "台東鹿野鄉茶園.jpg"),
      thumb: toStoryMediaPath("許秀孟", "台東鹿野鄉茶園.jpg"),
      caption: "台東鹿野鄉茶園"
    },
    {
      src: toStoryMediaPath("許秀孟", "台東池上稻田一景.jpg"),
      thumb: toStoryMediaPath("許秀孟", "台東池上稻田一景.jpg"),
      caption: "台東池上稻田一景"
    }  ],
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

  const {
    resolvedPreviewImage,
    resolvedFullImage,
    resolvedImageCandidates,
    setResolvedImageCandidates,
    setResolvedPreviewImage,
    isPreviewImageLoading,
  } = useReportImageResolver(sp.name, currentReport);

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
                      onClick={() => {
                        if (isPreviewImageLoading || !currentReport) {
                          return;
                        }
                        void openNewspaperPreview({
                          speakerName: sp.name,
                          currentReport,
                          resolvedImageCandidates,
                          resolvedPreviewImage,
                          setResolvedImageCandidates,
                          setResolvedPreviewImage,
                          page: "speakerProfile",
                          speakerId,
                        });
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