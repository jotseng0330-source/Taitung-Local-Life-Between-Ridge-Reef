import { useState, useEffect } from "react";
import type { NavPage } from "../types/navigation";

const FONT_TC   = "var(--font-qijic)";
const FONT_MONO = "'DM Mono','Courier New',monospace";
const BLUE      = "#78C2C4";
const FG        = "#ededf0";
const FG_MUTED  = "rgba(237,237,240,0.42)";
const BORDER    = "rgba(255,255,255,0.07)";

interface Props {
  current: NavPage;
  onNavigate: (page: NavPage, themeId?: number) => void;
}

export default function Header({ current, onNavigate }: Props) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const navItems: { label: string; page: NavPage }[] = [
    { label: "主題單元", page: "landing" },
    { label: "講者專欄", page: "speaker" },
    { label: "時空調閱系統", page: "calendar" },
  ];

  return (
    <header style={{
      position: "sticky",       
      top: 0,                  
      width: "100%",           
      boxSizing: "border-box",  
      zIndex: 9999,            
      height: isMobile ? "auto" : 60, 
      background: "rgba(7,7,13,0.96)",
      backdropFilter: "blur(20px)",
      borderBottom: `1px solid ${BORDER}`,
      display: "flex", 
      flexDirection: isMobile ? "column" : "row",
      alignItems: "center",
      padding: isMobile ? "20px 24px 14px" : "0 40px 0 20px", // 🎯 手機版左右留白稍微拉大，讓最左最右的按鈕有呼吸空間
      justifyContent: "space-between",
      gap: isMobile ? 16 : 40 
    }}>

      <button
        onClick={() => onNavigate("landing")}
        style={{
          background: "none", border: "none", cursor: "pointer", padding: 0,
          display: "flex", alignItems: "center", gap: 12,
          flexShrink: 0,
          alignSelf: isMobile ? "flex-start" : "center" // 🎯 手機版時主標題 Logo 靠左對齊
        }}
      >
        <span className="qijic-font-render" style={{
          fontFamily: FONT_TC, fontWeight: "normal",
          fontSize: isMobile ? "1.45rem" : "2.0rem",
          letterSpacing: "0.1em", color: FG, whiteSpace: "nowrap",
        }}>山海之間，地方日常</span>

        <div style={{ width: isMobile ? 4 : 8, height: isMobile ? 20 : 36, background: "#ededf0", opacity: 0.85 }} />

        <div style={{ 
          display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start",                
          textAlign: "left", fontFamily: "'Josefin Sans', sans-serif", fontSize: isMobile ? "0.5rem" : "0.65rem", color: "#ffffff", fontWeight: 700, textTransform: "uppercase" 
        }}>
          <span>Taitung:</span>
          <span>Local Life</span>
          <span>Between Ridge and Reef</span>
        </div>
      </button>

      {/* ── 🎯 這次手機版也徹底改好了！ ── */}
      <nav 
        className="mobile-nav-scroll" 
        style={{ 
          display: "flex", 
          flex: 1, // 🎯 不管電腦還是手機，通通撐滿剩餘空間
          width: "100%", // 🎯 確保手機版時能吃滿 100% 寬度
          maxWidth: isMobile ? "100%" : "500px", 
          gap: 0, // 🎯 拔掉固定 gap，交給 space-between 自動均分
          alignItems: "center", 
          justifyContent: "space-between" // 🎯 手機與電腦同步達成：最左、置中、最右完美對齊！
        }}
      >
        {navItems.map(({ label, page }) => {
          const active = current === page;
          return (
            <button
              key={label}
              onClick={() => onNavigate(page)}
              style={{
                fontFamily: FONT_MONO, fontWeight: "bold",
                fontSize: isMobile ? "0.95rem" : "1rem",
                letterSpacing: "0.12em",
                color: active ? FG : FG_MUTED,
                background: "none", border: "none", cursor: "pointer",
                padding: "4px 0",
                borderBottom: active ? `2px solid ${BLUE}` : "2px solid transparent",
                transition: "color 0.12s, border-color 0.12s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={e => { (e.currentTarget.style.color as any) = FG; }}
              onMouseLeave={e => { (e.currentTarget.style.color as any) = active ? FG : FG_MUTED; }}
            >
              {label}
            </button>
          );
        })}
      </nav>
    </header>
  );
}