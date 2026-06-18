import { useState, useEffect } from "react";
import { ArchiveCalendar } from "./ArchiveCalendar";
import { REPORTS_BY_SPEAKER } from "./CalendarPage"; 
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

export type SpeakerId = "1-0" | "1-1" | "2-0" | "3-0" | "4-0"; 

const SPEAKER_DATA: Record<SpeakerId, {
  name: string; honorific: string; institution: string; topic: string; portrait: string;
  tags: string[]; essayTitle: string; essayParas: string[]; themeId: number; themeIndex: string; themeTitle: string; themeTag: string; bgImage: string;
}> = {
  "1-0": {
    name: "范春源", honorific: "教授", institution: "國立台東大學體育學系", topic: "運動發展",
    portrait: "https://nwdpe.nttu.edu.tw/var/file/34/1034/img/374097944.jpg",
    tags: ["台東體育史", "運動社群", "更生日報體育版"],
    essayTitle: "從更生日報體育版讀見台東運動史",
    essayParas: [
      "更生日報創刊於民國三十六年（1947 年），是台灣東部歷史最悠久的地方報紙。七十餘年來，這份報紙靜靜記錄著台東縣的晴雨悲喜，見著了山海之間無數個普通人的日常生活——農事的節氣、漁獲的豐歉、廟會的鑼鼓與學校的運動會——這些被大歷史遺忘的細節，卻是地方社會最真實的體溫記錄。",
      "台東的體育文化，在更生日報的版面中佔有相當份量。從早期的學校運動會、部落傳統競技，到後來各鄉鎮的棒球聯賽，每一場比賽的勝負、每一位選手的名字，都被這份報紙忠實記錄下來。那些鉛字排版的消息，今天讀起來不作者成績紀錄，更是地方社群凝聚的見證。"
    ],
    themeId: 1, themeIndex: "01", themeTitle: "山海之間的生活節奏", themeTag: "地方要聞",
    bgImage: "https://images.unsplash.com/photo-1694005891521-150e805eebf1?w=1920&h=1080&fit=crop&auto=format"
  },
  "1-1": {
    name: "孟祥瀚", honorific: "退休教授", institution: "國立中興大學歷史學系", topic: "交通發展",
    portrait: "https://ws.th.gov.tw/002/TH/new_site/upload/show/2a757d4d76238f0d6b0006c42b2e116e.jpg",
    tags: ["台東交通史", "鐵路發展", "更生日報地方要聞"],
    essayTitle: "道路與鐵道：從更生日報讀台東交通百年",
    essayParas: [
      "更生日報創刊於民國三十六年（1947 年），是台灣東部歷史最悠久的地方報紙。七十餘年來，這份報紙靜靜記錄著台東縣的晴雨悲喜，見證了山海之間無數個普通人的日常生活——農事的節氣、漁獲的豐歉、廟會的鑼鼓與學校的運動會──這些紀錄，是地方社會最真實的體溫記錄。",
      "台東的交通史，是一部與山海搏鬥的歷史。從日治時期的輕便鐵道，到戰後的公路拓建，每一條新路的開通，對台東人來說都是大事。更生日報忠實記錄了這一切：哪一條省道完工通車、哪一段鐵路延伸到了新的鄉鎮，版面上的報導字字珠璣，背後是無數工程人員共同付出的心血。"
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
    essayTitle: "祭典的記憶：更生日報裡的原住民儀式與信仰",
    essayParas: [
      "更生日報幾十年來記錄了東台灣慶典儀式的許多切面：豐年祭的歌舞、卑南族的年祭、傳統祈福祭儀等。漢珍數位圖書與更生日報共同合作，透過數位調閱計畫將 these 泛黃的歷史檔案重現，為東台灣留下了極為珍貴的無形文化傳承記憶。"
    ],
    themeId: 4, themeIndex: "04", themeTitle: "祖先文化與土地", themeTag: "民俗信仰",
    bgImage: "https://images.unsplash.com/photo-1568093706416-302fa653623c?w=1920&h=1080&fit=crop&auto=format"
  }
};

const MEDIA_BY_THEME: Record<number, { src: string; thumb: string; caption: string }[]> = {
  1: [
    { src: "https://images.unsplash.com/photo-1694005891521-150e805eebf1?w=1200&h=800&fit=crop&auto=format", thumb: "https://images.unsplash.com/photo-1694005891521-150e805eebf1?w=200&h=140&fit=crop&auto=format", caption: "台東市郊道路旁的老樹，約 1950 年代。原版掃描自台東縣文化局典藏。" },
    { src: "https://images.unsplash.com/photo-1610859250485-31443500f8c6?w=1200&h=800&fit=crop&auto=format", thumb: "https://images.unsplash.com/photo-1610859250485-31443500f8c6?w=200&h=140&fit=crop&auto=format", caption: "池上鄉稻田與水岸，豐收季節農民作業景況，約 1960 年代。" },
  ],
  2: [
    { src: "https://images.unsplash.com/photo-1601482919158-1af01b70a427?w=1200&h=800&fit=crop&auto=format", thumb: "https://images.unsplash.com/photo-1601482919158-1af01b70a427?w=200&h=140&fit=crop&auto=format", caption: "台東在地藝文展覽與文藝聚會現場，約 1970 年代。" },
  ],
  3: [
    { src: "https://images.unsplash.com/photo-1694005892433-7c810c1e54ae?w=1200&h=800&fit=crop&auto=format", thumb: "https://images.unsplash.com/photo-1694005892433-7c810c1e54ae?w=200&h=140&fit=crop&auto=format", caption: "台東農業水圳灌溉系統，產業發展景況，約 1955 年。" },
  ],
  4: [
    { src: "https://images.unsplash.com/photo-1568093706416-302fa653623c?w=1200&h=800&fit=crop&auto=format", thumb: "https://images.unsplash.com/photo-1568093706416-302fa653623c?w=200&h=140&fit=crop&auto=format", caption: "台東民俗信仰燈籠節慶夜間儀式，約 1970 年代。" },
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
                  <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 16, fontSize: "1.05rem", color: "rgba(237,237,240,0.8)", lineHeight: 1.7, fontFamily: FONT_NOTO }}><span style={{ display: "block", color: FG_MUTED, fontSize: "0.95rem", marginBottom: 6, fontWeight: 700 }}>報導摘要大綱</span>{currentReport.summary}</div>
                </div>
                <div style={{ marginTop: 32 }}><a href={currentReport.newspaperUrl} target="_blank" rel="noopener noreferrer"><button style={{ width: "100%", padding: "14px", borderRadius: 10, background: "transparent", border: `2px solid ${BLUE}`, color: BLUE, fontFamily: FONT_NOTO, fontSize: "1.05rem", cursor: "pointer", fontWeight: 600 }}>點擊跨時空瀏覽《更生日報》真實歷史報紙原貌</button></a></div>
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