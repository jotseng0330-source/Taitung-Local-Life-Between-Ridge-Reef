import { useEffect, useState } from "react";

const logoKengSheng = new URL("./logo-kengsheng.png", import.meta.url).href;
const logoKanZen = new URL("./logo-kanzen.png", import.meta.url).href;

const FONT_MONO = "'DM Mono','Courier New',monospace";
const BLUE = "#78C2C4";
const FG_MUTED = "rgba(237,237,240,0.42)";
const BORDER = "rgba(255,255,255,0.07)";

export function Footer() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <footer style={{ borderTop: `1px solid ${BORDER}`, padding: isMobile ? "30px 20px 40px" : "30px 40px", display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "flex-end", gap: 24 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%" }}>
        <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 16 : 32, flexWrap: "wrap" }}>
          <a href="https://www.tbmc.com.tw/" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", cursor: "pointer" }}>
            <img src={logoKanZen} alt="漢珍數位圖書" style={{ height: isMobile ? "38px" : "60px", width: "auto", opacity: 0.95, display: "block" }} />
          </a>

          <div style={{ width: "1px", height: "20px", background: "rgba(255,255,255,0.15)" }} />

          <a href="http://www.ksnews.com.tw/" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", cursor: "pointer" }}>
            <img src={logoKengSheng} alt="更生日報" style={{ height: isMobile ? "48px" : "80px", width: "auto", opacity: 0.95, display: "block" }} />
          </a>
        </div>

        <span style={{ fontFamily: FONT_MONO, fontSize: "0.85rem", letterSpacing: "0.1em", color: FG_MUTED }}>
          © 2026 漢珍數位圖書公司 · 更生日報
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: isMobile ? "flex-start" : "flex-end" }}>
        <span style={{ 
          fontFamily: FONT_MONO, 
          fontSize: "0.85rem", 
          letterSpacing: "0.1em", 
          color: FG_MUTED,
          whiteSpace: "nowrap" 
        }}>
          @ PAGE CAFÉ 台東故事館
        </span>
      </div>
    </footer>
  );
}
