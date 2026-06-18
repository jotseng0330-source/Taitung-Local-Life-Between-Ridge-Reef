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
  position: "sticky",       /* 🛠️ 改用 sticky！這會讓它在到達最上方時自動「黏住」 */
  top: 0,                  /* 🛠️ 告訴瀏覽器：只要一貼到最頂端（0的位置）就立刻鎖死 */
  
  /* 鎖定寬度，不讓 sticky 變形 */
  width: "100%",           
  boxSizing: "border-box",  
  
  zIndex: 9999,            /* 🛠️ 層級一樣開到最大，確保不被任何下方元件遮擋 */

  /* 底下為維持你原本的排版與間距設定 */
  height: isMobile ? "auto" : 60, 
  background: "rgba(7,7,13,0.96)",
  backdropFilter: "blur(20px)",
  borderBottom: `1px solid ${BORDER}`,
  display: "flex", 
  flexDirection: isMobile ? "column" : "row",
  alignItems: "center",
  padding: isMobile ? "20px 16px 14px" : "0 40px 0 20px",
  justifyContent: "space-between",
  gap: isMobile ? 16 : 0
}}>

      <button
        onClick={() => onNavigate("landing")}
        style={{
          background: "none", border: "none", cursor: "pointer", padding: 0,
          display: "flex", alignItems: "center", gap: 12,
        }}
      >
        <span className="qijic-font-render" style={{
          fontFamily: FONT_TC, fontWeight: "normal",
          fontSize: isMobile ? "1.45rem" : "2.0rem",
          letterSpacing: "0.1em", color: FG, whiteSpace: "nowrap",
        }}>山海之間，地方日常</span>

        <div style={{ width: isMobile ? 4 : 8, height: isMobile ? 20 : 36, background: "#ededf0", opacity: 0.85 }} />

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center",alignItems: "flex-start",                /* 🛠️ 確保 flex 子元素（span）從最左邊開始排 */
  textAlign: "left", fontFamily: "'Josefin Sans', sans-serif", fontSize: isMobile ? "0.5rem" : "0.65rem", color: "#ffffff", fontWeight: 700, textTransform: "uppercase" }}>
          <span>Taitung:</span>
          <span>Local Life</span>
          <span>Between Ridge and Reef</span>
        </div>
      </button>

      <nav className="mobile-nav-scroll" style={{ display: "flex", gap: isMobile ? 20 : 36, alignItems: "center", justifyContent: "center" }}>
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
