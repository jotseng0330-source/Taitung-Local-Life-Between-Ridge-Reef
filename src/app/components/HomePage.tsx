import { useState, useRef, useEffect } from "react";
import Header from "./Header";
import type { NavPage } from "../types/navigation";

const logoKengSheng = new URL("./logo-kengsheng.png", import.meta.url).href;
const logoKanZen = new URL("./logo-kanzen.png", import.meta.url).href;

const FONT_TC   = "var(--font-qijic)";
const FONT_NOTO = "'Noto Sans', 'Helvetica Neue', Arial, sans-serif";
const FONT_MONO = "'DM Mono','Courier New',monospace";
const BLUE      = "#78C2C4";
const BG        = "#07070d";
const FG        = "#ededf0";
const FG_MUTED  = "rgba(237,237,240,0.42)";
const BORDER    = "rgba(255,255,255,0.07)";

// ─── 輪播圖片陣列 ───
const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1611037114947-0b436af42ed9?q=80&w=988&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1611023705027-7a387cc062de?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fFRhaXR1bmd8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1610859250485-31443500f8c6?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fFRhaXR1bmd8ZW58MHx8MHx8fDA%3D"  
];

const CARDS = [
  {
    id: 1, index: "01",
    title: "山海之間的生活節奏（地方要聞）",
    src: "https://img.ltn.com.tw/Upload/news/600/2026/04/30/5421176_4_1.jpg",
    alt: "台東縣稻田與水岸，農業景觀",
  },
  {
    id: 2, index: "02",
    title: "地方藝文與文化人",
    src: "https://images.unsplash.com/photo-1601482919158-1af01b70a427?w=1000&h=680&fit=crop&auto=format",
    alt: "台灣在地文化人物與藝術場景",
  },
  {
    id: 3, index: "03",
    title: "地方特色產業發展",
    src: "https://icrvb3jy.xinmedia.com/solomo/article/7/0/4/7048FC0F-2676-4E05-BA98-78831E2E1F9B.jpg",
    alt: "台東農業水圳灌溉系統景觀",
  },
  {
    id: 4, index: "04",
    title: "祖先文化與土地",
    src: "https://upload.wikimedia.org/wikipedia/commons/9/90/台灣台東南王普悠瑪除喪祭團祭.jpg",
    alt: "民俗信仰燈籠節慶夜間儀式",
  },
];

interface Props {
  onCardClick:  (id: number) => void;
  onNavigate:   (page: NavPage) => void;
}

export function HomePage({ onCardClick, onNavigate }: Props) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [currentImgIndex, setCurrentImgIndex] = useState(0); // 輪播索引
  const themesRef = useRef<HTMLElement>(null);

  // 📱 偵測是否為行動裝置斷點 (小於 1024px 皆視為寬幅行動或平板視窗)
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // ─── 自動輪播效果：每 4 秒換一張圖 ───
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  function handleNav(label: string) {
    if (label === "主題單元") {
      themesRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (label === "講者專欄") {
      onNavigate("speaker");
    } else if (label === "時空調閱系統") {
      onNavigate("calendar");
    }
  }

  return (
    <div style={{ fontFamily: FONT_NOTO, background: BG, color: FG, minHeight: "100vh", position: "relative" }}>
      
      {/* ─── 網頁內置字體引入 CSS ─── */}
      <style>{`
        @font-face {
          font-family: 'QIJIC'; 
          src: url('./fonts/qiji-combo.ttf') format('truetype');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }
        .qijic-font-render {
          font-family: 'QIJIC', ${FONT_TC} !important;
        }
      `}</style>

      {/* ── Atmospheric background ── */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: -20,
          backgroundImage: "url(https://images.unsplash.com/photo-1611037114947-0b436af42ed9?w=1920&h=1080&fit=crop&auto=format)",
          backgroundSize: "cover", backgroundPosition: "center 30%",
          opacity: 0.04, filter: "blur(4px) saturate(0.4)",
        }} />
        <div style={{
          position: "absolute", bottom: "-20%", left: "-10%",
          width: "55vw", height: "55vw", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,144,255,0.05) 0%, transparent 70%)",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(rgba(255,255,255,0.022) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }} />
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>

      <Header current="landing" onNavigate={onNavigate} />

      {/* ─── HERO ─── */}
      <section className="hero-section" style={{ paddingTop: 60, height: "100vh", position: "relative", overflow: "hidden" }}>
        
        {/* ─── 改動：大氣圖片淡入淡出輪播 ─── */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          {HERO_IMAGES.map((imgUrl, index) => (
            <div
              key={imgUrl}
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `url(${imgUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: index === currentImgIndex ? 1 : 0,
                transform: index === currentImgIndex ? "scale(1)" : "scale(1.04)",
                transition: "opacity 1.5s ease-in-out, transform 1.5s ease-in-out",
              }}
            />
          ))}
        </div>
        
        {/* 壓暗遮罩：襯托中央標題文字 */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(6,6,14,0.55), rgba(7,7,13,0.85))", zIndex: 1 }} />

        {/* Centred title */}
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          textAlign: "center", padding: "0 24px", zIndex: 10,
        }}>
          <div style={{ width: 1, height: 44, background: "rgba(255,255,255,0.18)", marginBottom: 26 }} />

          <h1 className="hero-title qijic-font-render" style={{
            fontWeight: "bold",
            fontSize: "clamp(2rem, 5.2vw, 4.6rem)",
            lineHeight: 1.4, letterSpacing: "0.06em",
            color: "#ffffff", margin: "0 0 24px",
            textShadow: "0 4px 20px rgba(0,0,0,0.6)",
          }}>
            山海之間 台東日常<br />
            <span style={{ color: BLUE }}>從 更生日報 側看家鄉事</span>
          </h1>

          <div style={{ width: 48, height: 1, background: "rgba(255,255,255,0.2)", marginBottom: 18 }} />

          <p className="hero-subtitle" style={{
            fontFamily: "'Josefin Sans'", 
            fontSize: "1.15rem",
            fontWeight: "500",
            letterSpacing: "0.18em",
            color: "#ffffff",
            margin: 0, lineHeight: 2,
            textShadow: "0 2px 8px rgba(0,0,0,0.6)",
          }}>
            展覽時間：
            <br />
            2026 / 7 / 1 &nbsp;—&nbsp; 9 / 30
            <br />
            <br />
            展覽地點：
            <br />
            PAGE CAFÉ 台東故事館
          </p>

          <div style={{ width: 1, height: 44, background: "rgba(255,255,255,0.18)", marginTop: 26 }} />
        </div>

        {/* Credit */}
        <div className="hero-credit" style={{ position: "absolute", bottom: 10, left: 10, zIndex: 10, opacity: 0.3 }}>
          <span style={{
            fontFamily: FONT_MONO, 
            fontSize: "1.0rem",
            letterSpacing: "0.14em", 
            color: "#ffffff",
          }}>
            漢珍數位圖書公司 · 更生日報
          </span>
        </div>
      </section>
      

      {/* ─── THEME GRID 主題單元 ─── */}
      <section ref={themesRef} id="themes" className="theme-section" style={{ padding: isMobile ? "50px 20px 60px" : "80px 40px 100px" }}>
        <div className="theme-header" style={{
          display: "flex", flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "flex-start" : "center", justifyContent: "space-between",
          borderBottom: `1px solid ${BORDER}`,
          paddingBottom: 14, marginBottom: 24, gap: isMobile ? 8 : 0
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 2, height: 16, background: BLUE }} />
            <span style={{
              fontFamily: FONT_MONO, fontSize: isMobile ? "1.0rem" : "1.2rem",
              letterSpacing: "0.15em", color: "#ffffff", textTransform: "uppercase", fontWeight: "bold"
            }}>主題單元 / Themes</span>
          </div>
          <span style={{
            fontFamily: FONT_MONO, fontSize: isMobile ? "0.8rem" : "1.0rem",
            letterSpacing: "0.08em", color:"#ffffff", opacity: 0.7
          }}>請點擊任一主題進入</span>
        </div>

        {/* 📱 核心排版：手機自動轉 1fr 垂直直排，大螢幕維持原樣 2 欄 */}
        <div className="theme-grid" style={{ 
          display: "grid", 
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", 
          gap: isMobile ? "16px" : "24px" 
        }}>
          {CARDS.map((card) => {
            const isH = hovered === card.id;
            return (
              <button
                key={card.id}
                onClick={() => onCardClick(card.id)}
                onMouseEnter={() => setHovered(card.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  position: "relative", display: "block",
                  background: "none", border: "none", padding: 0,
                  cursor: "pointer", textAlign: "left", outline: "none",
                  overflow: "hidden", aspectRatio: isMobile ? "16 / 10.5" : "16 / 10",
                  width: "100%"
                }}
              >
                <img
                  src={card.src} alt={card.alt}
                  style={{
                    width: "100%", height: "100%", objectFit: "cover", display: "block",
                    transition: "transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)",
                    transform: (isH && !isMobile) ? "scale(1.05)" : "scale(1)",
                  }}
                />
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to top,rgba(0,0,0,0.9) 0%,rgba(0,0,0,0.3) 60%,transparent 100%)",
                }} />

                <div style={{
                  position: "absolute", top: isMobile ? 12 : 18, left: isMobile ? 14 : 20,
                  fontFamily: FONT_MONO, fontSize: "0.88rem",
                  letterSpacing: "0.12em", color: "rgba(255,255,255,0.4)",
                }}>{card.index}</div>

                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0,
                  padding: isMobile ? "0 16px 16px" : "0 22px 22px",
                }}>
                  <p style={{
                    fontFamily: FONT_MONO,
                    fontSize: isMobile ? "1.0rem" : "1.15rem", 
                    lineHeight: 1.5,
                    fontWeight: "bold",
                    letterSpacing: "0.05em",
                    color: "#fff", margin: 0,
                  }}>{card.title}</p>
                  
                  <div style={{
                    marginTop: 8, height: 1, background: BLUE,
                    width: isH ? "100%" : 0,
                    transition: "width 0.38s cubic-bezier(0.25,0.46,0.45,0.94)",
                  }} />
                </div>
              </button>
            );
          })}
        </div>
      </section>
      </div>
    </div>
  );
}

export default HomePage;