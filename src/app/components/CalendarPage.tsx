import { useState, useRef, useEffect } from "react";
import { ArchiveCalendar } from "./ArchiveCalendar";
import Header from "./Header";
import type { NavPage } from "../types/navigation";

const BLUE      = "#78C2C4";
const BG        = "#07070d";
const FG        = "#ededf0";
const FG_MUTED  = "rgba(237,237,240,0.42)";
const BORDER    = "rgba(255,255,255,0.07)";
const FONT_TC   = "var(--font-qijic)";
const FONT_NOTO = "'Noto Sans', 'Helvetica Neue', Arial, sans-serif";
const FONT_MONO = "'DM Mono','Courier New',monospace";

const THEMES = [
  { id: 1, index: "01", title: "山海之間的生活節奏", tag: "地方要聞", src: "https://img.ltn.com.tw/Upload/news/600/2026/04/30/5421176_4_1.jpg" },
  { id: 2, index: "02", title: "地方藝文與文化人", tag: "文化藝術", src: "https://images.unsplash.com/photo-1601482919158-1af01b70a427?w=600&h=360&fit=crop&auto=format" },
  { id: 3, index: "03", title: "地方特色產業發展", tag: "產業史", src: "https://icrvb3jy.xinmedia.com/solomo/article/7/0/4/7048FC0F-2676-4E05-BA98-78831E2E1F9B.jpg" },
  { id: 4, index: "04", title: "祖先文化與土地", tag: "民俗信仰", src: "https://upload.wikimedia.org/wikipedia/commons/9/90/台灣台東南王普悠瑪除喪祭團祭.jpg" },
];

const SPEAKERS_BY_THEME: Record<number, Array<{ id: string; name: string; subTopic: string }>> = {
  1: [
    { id: "1-0", name: "范春源 教授", subTopic: "運動發展" },
    { id: "1-1", name: "孟祥瀚 退休教授", subTopic: "交通發展" }
  ],
  2: [
    { id: "2-0", name: "徐千惠 老師", subTopic: "台東兒童文學發展" }
  ],
  3: [
    { id: "3-0", name: "許秀孟 教授", subTopic: "魚苗與香茅" }
  ],
  4: [
    { id: "4-0", name: "黃琴扉 教授", subTopic: "原住民文化與傳統儀式" }
  ]
};

export const REPORTS_BY_SPEAKER: Record<string, Array<{
  date: string; year: number; month: number; day: number;
  title: string; reporter: string; summary: string; newspaperUrl: string;
}>> = {
  "1-0": [
    { date: "1947-07-15", year: 1947, month: 7, day: 15, title: "台東全縣全運會盛大開幕：展現戰後地方朝氣", reporter: "本報特派記者 張地方", summary: "更生日報創刊首月即詳細報導了台東全縣運動會之盛況。全縣各鄉鎮健兒共聚一堂，展現了極具地方凝聚力的歷史一頁。", newspaperUrl: "https://www.ksnews.com.tw/" },
    { date: "1960-06-12", year: 1960, month: 6, day: 12, title: "紅葉少棒萌芽期：地方聯賽打出名號", reporter: "地方記者 林山海", summary: "本報記者深入延平鄉紅葉村，記錄學童練球日常。這群山中健兒在地方少棒聯賽中展露頭角，更生日報常年的追蹤報導，成為紅葉傳奇最珍貴的起點紀錄。", newspaperUrl: "https://www.ksnews.com.tw/" }
  ],
  "1-1": [
    { date: "1947-10-15", year: 1947, month: 10, day: 15, title: "台東大橋開通要聞：東台灣交通新紀元", reporter: "本報特派記者 張地方", summary: "台東大橋於昨日舉行隆重通車典禮。此座橫跨卑南溪的鋼筋混凝土大橋歷時數年克服物料短缺艱難完工，通車後將徹底終結往返縱谷與市區需涉水涉溪的險象，對地方產業與民生物資調度具有里程碑式歷史意義。", newspaperUrl: "https://www.ksnews.com.tw/" },
    { date: "2020-04-15", year: 2020, month: 4, day: 15, title: "南迴鐵路電氣化測試：台東鐵路網最後一哩路", reporter: "交通記者 鐵道迷", summary: "南迴鐵路電氣化工程進入最後測試階段。這項耗時多年的艱鉅工程克服了無數隧道與崇山峻嶺的考驗，通車後台北至台東車程將再度縮短，更生日報詳實見證了台東與外縣市空間距離的歷史性跨越。", newspaperUrl: "https://www.ksnews.com.tw/" }
  ],
  "2-0": [
    { date: "1972-04-05", year: 1972, month: 4, day: 5, title: "台東兒童文學新苗：地方學校童詩創作展成果覽", reporter: "副刊編輯 筆尖人", summary: "更生日報副刊今日以大篇幅刊登台東多所國小學童的優秀童詩作品。主編指出，地方副刊常年開闢兒童文學專欄，對啟迪東台灣學子的創作想像與紀錄純真日常，有著無可替代的催生作用。", newspaperUrl: "https://www.ksnews.com.tw/" },
    { date: "1988-11-20", year: 1988, month: 11, day: 20, title: "台東故事媽媽劇團巡迴：兒童文學走向地方社區", reporter: "記者 文藝風", summary: "由地方教育工作者自發成立的兒童文學推團，今日於台東公會堂進行首場成果公演。現場座無虛席，泛黃的剪報記錄了兒童文學如何在台東土地深耕發芽、成為幾代人童年記憶的歷史片段。", newspaperUrl: "https://www.ksnews.com.tw/" }
  ],
  "3-0": [
    { date: "1980-05-07", year: 1980, month: 5, day: 7, title: "關山大圳擴建竣工：縱谷稻米產業史新篇章", reporter: "產業特派員 洪地方", summary: "歷時年餘之關山大圳延伸灌溉工程今日正式通水。新水路引卑南溪水源源灌溉百頃良田，預期可讓關山地區水稻年產量翻倍，奠定關山優質米名揚全台之基石，更生報如實記錄了這段產業勞動肌理。", newspaperUrl: "https://www.ksnews.com.tw/" },
    { date: "2000-01-12", year: 2000, month: 1, day: 12, title: "釋迦產業大躍進：台東開創農業精緻化外銷傳奇", reporter: "特派記者 農家樂", summary: "在農業改良場與地方產銷班的攜手努力下，台東釋迦外銷冷鏈技術取得突破性進展。本報今日追蹤報導台東太麻里與卑南一帶的外銷裝箱盛況，象徵台東地方特色水果成功打入國際高端市場。", newspaperUrl: "https://www.ksnews.com.tw/" }
  ],
  "4-0": [
    { date: "1990-08-03", year: 1990, month: 8, day: 3, title: "南王部落普悠瑪祭典：民俗信仰之神聖記載", reporter: "特派記者 卑南客", summary: "台東南王部落今日迎來盛大的除喪祭團祭儀。全體族人身著傳統盛裝共聚祭場，透過吟唱古調與神聖儀式向祖靈傳遞敬意。更生日報幾十年來對地方慶典的追蹤，捕捉到了人群中深沉的集體情緒。", newspaperUrl: "https://www.ksnews.com.tw/" },
    { date: "2026-06-17", year: 2026, month: 6, day: 17, title: "《山海之間，地方日常》聯展開幕：共築台東故事長廊", reporter: "文史記者 展廳特報", summary: "由漢珍數位圖書公司與更生日報共同主辦的特展於台東故事館盛大開幕。展覽結合珍貴的報紙掃描原件與數位互動導航，透過一幀幀老照片與史料，喚醒東台灣八十載的日常記憶，展出首日即引發熱烈迴響。", newspaperUrl: "https://www.ksnews.com.tw/" }
  ]
};

interface Props {
  defaultThemeId?: number;
  onNavigate: (page: NavPage, themeId?: number) => void;
}

export function CalendarPage({ defaultThemeId, onNavigate }: Props) {
  const [selectedTheme, setSelectedTheme] = useState<number | null>(defaultThemeId ?? null);
  const [activeSpeakerId, setActiveSpeakerId] = useState<string>("");
  const [reportIndex, setReportIndex] = useState(0);
  const [hoveredTheme, setHoveredTheme]  = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const calendarSectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (selectedTheme) {
      const availableSpeakers = SPEAKERS_BY_THEME[selectedTheme] || [];
      if (availableSpeakers.length > 0) {
        setActiveSpeakerId(availableSpeakers[0].id);
        setReportIndex(0);
      }
    }
  }, [selectedTheme]);

  const currentReports = activeSpeakerId ? (REPORTS_BY_SPEAKER[activeSpeakerId] ?? []) : [];
  const currentReport = currentReports[reportIndex];

  // 🎯 修正後的卡片點擊函式：依據講者數量決定是否立即下滑
  function pickTheme(id: number) {
    setSelectedTheme(id);
    
    const availableSpeakers = SPEAKERS_BY_THEME[id] || [];
    if (availableSpeakers.length <= 1) {
      setTimeout(() => {
        if (calendarSectionRef.current) {
          calendarSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 150);
    }
  }

  return (
    <div style={{ fontFamily: FONT_TC, background: BG, color: FG, minHeight: "100vh", position: "relative" }}>
      <style>{`
        @font-face { font-family: 'QIJIC'; src: url('./fonts/qiji-combo.ttf') format('truetype'); font-weight: normal; font-style: normal; font-display: swap; }
        .qijic-font-render { font-family: 'QIJIC', ${FONT_TC} !important; }
      `}</style>

      <div style={{ position: "relative", zIndex: 1 }}>
        <Header current="calendar" onNavigate={onNavigate} />

        {/* ── 🎯 TITLE: 補回大氣插圖背景 ── */}
        <div style={{ paddingTop: isMobile ? 90 : 60, borderBottom: `1px solid ${BORDER}`, position: "relative", overflow: "hidden" }}>
          {/* 圖片背景 */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "url(https://images.unsplash.com/photo-1568093706416-302fa653623c?w=1920&h=1080&fit=crop&auto=format)",
            backgroundSize: "cover", backgroundPosition: "center 40%",
            opacity: 0.15, filter: "grayscale(60%)", zIndex: 0
          }} />
          {/* 暗色遮罩 */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(7,7,13,0.4), rgba(7,7,13,0.9))", zIndex: 1 }} />

          <div style={{ padding: isMobile ? "32px 20px 24px" : "44px 40px 36px", position: "relative", zIndex: 2 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{ width: 2, height: 18, background: BLUE }} />
              <span style={{
                fontFamily: FONT_MONO, fontSize: "0.8rem",
                letterSpacing: "0.15em", color: FG_MUTED, textTransform: "uppercase",
              }}>
                Source · 更生日報 1947–2026
              </span>
            </div>
            <h1 className="qijic-font-render" style={{ fontWeight: 400, fontSize: isMobile ? "1.8rem" : "3rem", color: FG, margin: "0 0 12px" }}>
              更生日報 時空調閱系統
            </h1>
            <p style={{ fontFamily: FONT_NOTO, fontSize: "1.02rem", color: FG_MUTED, margin: 0, lineHeight: 1.7 }}>
              請先選擇四大主題分類，系統將引導您調閱對應文史專家的精選真實發刊紀錄。
            </p>
          </div>
        </div>

        {/* THEME SELECTOR */}
        <div style={{ padding: isMobile ? "30px 20px 0" : "40px 40px 0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <div style={{ width: 24, height: 24, borderRadius: "50%", background: BLUE, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: FONT_MONO, fontSize: "0.85rem", fontWeight: 600, color: BG }}>1</span>
            </div>
            <h2 style={{ fontFamily: FONT_NOTO, fontWeight: 700, fontSize: "0.95rem", color: FG, margin: 0 }}>選擇主題分類</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(4, 1fr)", gap: "14px" }}>
            {THEMES.map(theme => {
              const isSelected = selectedTheme === theme.id;
              const isHovered  = hoveredTheme  === theme.id;
              return (
                <button
                  key={theme.id} onClick={() => pickTheme(theme.id)}
                  onMouseEnter={() => setHoveredTheme(theme.id)} onMouseLeave={() => setHoveredTheme(null)}
                  style={{
                    position: "relative", display: "block", background: "none", padding: 0, cursor: "pointer", textAlign: "left", overflow: "hidden", aspectRatio: "16 / 10", outline: isSelected ? `3px solid ${BLUE}` : "none", border: isSelected ? "none" : `1px solid ${isHovered ? "rgba(120,194,196,0.4)" : BORDER}`, transition: "outline 0.15s", width: "100%"
                  }}
                >
                  <img src={theme.src} alt={theme.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transform: (isSelected || isHovered) ? "scale(1.03)" : "scale(1)", transition: "transform 0.5s" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 100%)" }} />
                  <div style={{ position: "absolute", top: 10, left: 12, fontFamily: FONT_MONO, fontSize: "0.78rem", color: "rgba(255,255,255,0.4)" }}>{theme.index}</div>
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 14px 14px" }}>
                    <p style={{ fontFamily: FONT_NOTO, fontWeight: 700, fontSize: "0.95rem", lineHeight: 1.4, color: "#fff", margin: "0 0 4px" }}>{theme.title}</p>
                    <span style={{ fontFamily: FONT_MONO, fontSize: "0.75rem", color: isSelected ? BLUE : "rgba(255,255,255,0.4)" }}>{theme.tag}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* 🎯 修改後的按鈕列：純粹乾淨標示子題標題名稱，點選後才下滑 */}
          {selectedTheme && (SPEAKERS_BY_THEME[selectedTheme] || []).length > 1 && (
            <div style={{ marginTop: 20, padding: "12px", background: "rgba(255,255,255,0.02)", border: `1px solid ${BORDER}`, display: "flex", gap: 10, alignItems: "center" }}>
              <span style={{ fontSize: "0.85rem", color: FG_MUTED, fontFamily: FONT_NOTO }}>請選擇單元分項：</span>
              {(SPEAKERS_BY_THEME[selectedTheme] || []).map(sp => (
                <button
                  key={sp.id} 
                  onClick={() => { 
                    setActiveSpeakerId(sp.id); 
                    setReportIndex(0); 
                    setTimeout(() => {
                      if (calendarSectionRef.current) {
                        calendarSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
                      }
                    }, 100);
                  }}
                  style={{
                    padding: "6px 14px", fontFamily: FONT_NOTO, fontSize: "0.9rem", cursor: "pointer", background: activeSpeakerId === sp.id ? BLUE : "transparent", color: activeSpeakerId === sp.id ? BG : FG, border: `1px solid ${activeSpeakerId === sp.id ? BLUE : "rgba(255,255,255,0.2)"}`, borderRadius: 4, transition: "all 0.2s"
                  }}
                >
                  {sp.subTopic}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* STEP 2 PANEL */}
        <div style={{ marginTop: 0, maxHeight: selectedTheme ? "2200px" : 0, overflow: "hidden", transition: "max-height 0.5s ease-out" }}>
          {selectedTheme && currentReport && (
            <div ref={calendarSectionRef} style={{ borderTop: `2px solid ${BORDER}`, marginTop: 40, scrollMarginTop: "60px" }}>
              <div style={{ padding: "32px 40px 0", borderBottom: `1px solid ${BORDER}`, paddingBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 24, height: 24, borderRadius: "50%", background: BLUE, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontFamily: FONT_MONO, fontSize: "0.85rem", fontWeight: 600, color: BG }}>2</span></div>
                <h2 style={{ fontFamily: FONT_NOTO, fontWeight: 700, fontSize: "0.95rem", color: FG, margin: 0 }}>文獻時空調閱中心</h2>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "380px 1fr", minHeight: 480 }}>
                {/* 左日曆 */}
                <div style={{ padding: "36px 40px", borderRight: isMobile ? "none" : `1px solid ${BORDER}`, display: "flex", flexDirection: "column", gap: 20 }}>
                  <ArchiveCalendar targetYear={currentReport.year} targetMonth={currentReport.month} targetDay={currentReport.day} />
                  <div style={{ display: "flex", gap: 12, justifyContent: "space-between" }}>
                    <button onClick={() => reportIndex > 0 && setReportIndex(reportIndex - 1)} disabled={reportIndex === 0} style={{ flex: 1, padding: "12px", borderRadius: 8, border: `1px solid ${reportIndex === 0 ? "rgba(255,255,255,0.05)" : BLUE}`, background: "transparent", color: reportIndex === 0 ? "rgba(255,255,255,0.2)" : BLUE, cursor: "pointer", fontFamily: FONT_NOTO }}>← 上一則</button>
                    <button onClick={() => reportIndex < currentReports.length - 1 && setReportIndex(reportIndex + 1)} disabled={reportIndex === currentReports.length - 1} style={{ flex: 1, padding: "12px", borderRadius: 8, background: reportIndex === currentReports.length - 1 ? "transparent" : BLUE, color: reportIndex === currentReports.length - 1 ? "rgba(255,255,255,0.2)" : BG, border: "none", cursor: "pointer", fontWeight: 600, fontFamily: FONT_NOTO }}>下一則 →</button>
                  </div>
                  <div style={{ textAlign: "center", fontFamily: FONT_MONO, fontSize: "0.8rem", color: FG_MUTED }}>篇數 {reportIndex + 1} / {currentReports.length}</div>
                </div>

                <div style={{ padding: "36px 52px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", borderBottom: `1px solid ${BORDER}`, paddingBottom: 14, marginBottom: 20 }}><span style={{ fontFamily: FONT_MONO, color: BLUE, fontSize: "1.05rem" }}>報導日期：{currentReport.date}</span></div>
                    <h3 style={{ fontFamily: FONT_NOTO, fontSize: "1.7rem", fontWeight: 700, color: FG, margin: "0 0 12px 0", lineHeight: 1.4 }}>{currentReport.title}</h3>
                    <div style={{ fontSize: "0.92rem", color: BLUE, marginBottom: 20, fontFamily: FONT_NOTO }}>本報記者：{currentReport.reporter}</div>
                    <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 16, fontSize: "1.05rem", color: "rgba(237,237,240,0.8)", lineHeight: 1.7, fontFamily: FONT_NOTO }}><span style={{ display: "block", color: FG_MUTED, fontSize: "0.95rem", marginBottom: 6, fontWeight: 700 }}>報導摘要大綱</span>{currentReport.summary}</div>
                  </div>
                  <div style={{ marginTop: 32 }}><a href={currentReport.newspaperUrl} target="_blank" rel="noopener noreferrer"><button style={{ width: "100%", padding: "14px", borderRadius: 10, background: "transparent", border: `2px solid ${BLUE}`, color: BLUE, fontFamily: FONT_NOTO, fontSize: "1.05rem", cursor: "pointer", fontWeight: 600 }}>點擊跨時空瀏覽《更生日報》真實報紙原貌</button></a></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <footer style={{ borderTop: `1px solid ${BORDER}`, padding: "30px 40px" }}><span style={{ fontFamily: FONT_MONO, fontSize: "0.85rem", color: FG_MUTED }}>© 更生日報全報影像資料庫 (Cretit: 漢珍數位圖書公司)</span></footer>
      </div>
    </div>
  );
}

export default CalendarPage;