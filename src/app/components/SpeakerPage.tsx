import { useState, useRef, useEffect } from "react";
import Header from "./Header";
import ScrollHint from "./ScrollHint";
import type { NavPage } from "../types/navigation";
import type { SpeakerId } from "./StoryPage";

const BLUE      = "#78C2C4";
const BG        = "#07070d";
const FG        = "#ededf0";
const FG_MUTED  = "rgba(237,237,240,0.42)";
const BORDER    = "rgba(255,255,255,0.07)";
const FONT_TC   = "var(--font-qijic)";
const FONT_NOTO = "'Noto Sans', 'Helvetica Neue', Arial, sans-serif";
const FONT_MONO = "'DM Mono','Courier New',monospace";

const THEME_GROUPS = [
  {
    themeId: 1, index: "01", title: "山海之間的生活節奏", tag: "地方要聞",
    speakers: [
      { speakerId: "1-1" as SpeakerId, name: "孟祥瀚", honorific: "退休教授", institution: "國立中興大學歷史學系", topic: "交通發展", portrait: "/portrait/孟祥瀚%20Profile.jpg" },
    ],
  },
  {
    themeId: 2, index: "02", title: "地方藝文與文化人", tag: "文化藝術",
    speakers: [
      { speakerId: "2-0" as SpeakerId, name: "徐千惠", honorific: "老師", institution: "國立台東高中退休教師", topic: "後山文學推廣", portrait: "/portrait/徐千惠%20Profile.jpg" }
    ],
  },
  {
    themeId: 3, index: "03", title: "地方特色產業發展", tag: "產業史",
    speakers: [
      { speakerId: "3-0" as SpeakerId, name: "許秀孟", honorific: "博士後研究員", institution: "國立臺東大學人文創新與社會實踐中心", topic: "傳統產業發展", portrait: "/portrait/許秀孟%20Profile.jpg" },
    ],
  },
  {
    themeId: 4, index: "04", title: "祖先文化與土地", tag: "民俗信仰",
    speakers: [
      { speakerId: "4-0" as SpeakerId, name: "劉烱錫", honorific: "主任", institution: "國立台東大學友善環境農漁產業發展中心", topic: "原住民族部落永續發展", portrait: "/portrait/劉烱錫%20Profile.jpg" }, 
    ],
  },
];

interface Props {
  defaultThemeId?:  number;
  onNavigate:       (page: NavPage, themeId?: number) => void;
  onSelectSpeaker:  (speakerId: SpeakerId) => void;
}

export function SpeakerPage({ defaultThemeId, onNavigate, onSelectSpeaker }: Props) {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const themeRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (defaultThemeId == null) return;
    const el = themeRefs.current[defaultThemeId];
    if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 150);
  }, [defaultThemeId]);

  return (
    <div style={{ fontFamily: FONT_NOTO, background: BG, color: FG, minHeight: "100vh", position: "relative" }}>
      <style>{`
        @font-face { font-family: 'QIJIC'; src: url('./fonts/qiji-combo.ttf') format('truetype'); font-weight: normal; font-style: normal; font-display: swap; }
        .qijic-font-render { font-family: 'QIJIC', ${FONT_TC} !important; }
      `}</style>

      <div style={{ position: "relative", zIndex: 1 }}>
        <ScrollHint label="往下滑看講者內容" />
        <Header current="speaker" onNavigate={onNavigate} />

        {/* ── 滿版背景插圖 ── */}
        <div style={{ paddingTop: isMobile ? 90 : 60, borderBottom: `1px solid ${BORDER}`, position: "relative", overflow: "hidden" }}>
          {/* 圖片背景層 */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "url(https://images.unsplash.com/photo-1611023705027-7a387cc062de?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
            backgroundSize: "cover", backgroundPosition: "center 70%",
            opacity: 0.5, filter: "grayscale(60%)", zIndex: 0
          }} />
          {/* 暗色漸層遮罩 */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(7,7,13,0.4), rgba(7,7,13,0.9))", zIndex: 1 }} />

          {/* 文字內容 */}
          <div style={{ padding: isMobile ? "36px 20px 32px" : "52px 40px 44px", position: "relative", zIndex: 2 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{ width: 2, height: 18, background: BLUE }} />
              <span style={{
                fontFamily: FONT_MONO, fontSize: "0.8rem",
                letterSpacing: "0.15em", color: FG_MUTED, textTransform: "uppercase",
              }}>
                Contributor Column
              </span>
            </div>
            <h1 className="qijic-font-render" style={{ fontWeight: 400, fontSize: isMobile ? "2rem" : "3rem", color: FG, margin: 0 }}>講者專欄</h1>
            <p style={{ fontSize: "1.02rem", color: FG_MUTED, marginTop: 8, maxWidth: 600 }}>
              本特展邀請深耕台東的學者與教育工作者，分享他們對更生日報歷史文獻的研究記憶。
            </p>
          </div>
        </div>

        {/* LIST */}
        <div style={{ padding: isMobile ? "0 20px 60px" : "0 40px 80px" }}>
          {THEME_GROUPS.map((group, gi) => (
            <div key={group.themeId} ref={(el) => { themeRefs.current[group.themeId] = el; }} style={{ paddingTop: 40, borderBottom: gi < THEME_GROUPS.length - 1 ? `1px solid ${BORDER}` : "none", paddingBottom: 40, position: "relative" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <span style={{ fontFamily: FONT_MONO, fontSize: "0.8rem", color: BLUE }}>THEME {group.index}</span>
                <span style={{ fontFamily: FONT_MONO, fontSize: "0.8rem", color: FG_MUTED }}>{group.tag}</span>
              </div>
              <h2 style={{ fontSize: "1.3rem", fontWeight: 900, color: FG, margin: "0 0 24px" }}>{group.title}</h2>

              <div style={{ display: "grid", gridTemplateColumns: isMobile || group.speakers.length === 1 ? "1fr" : "1fr 1fr", gap: 16 }}>
                {group.speakers.map((sp, si) => {
                  const key = `${group.themeId}-${si}`;
                  const isH = hoveredKey === key;
                  return (
                    <button
                      key={si} onClick={() => onSelectSpeaker(sp.speakerId)}
                      onMouseEnter={() => setHoveredKey(key)} onMouseLeave={() => setHoveredKey(null)}
                      style={{ 
                        display: "flex", 
                        flexDirection: "row", 
                        background: isH ? "rgba(120,194,196,0.06)" : "rgba(255,255,255,0.02)", 
                        border: `1px solid ${isH ? BLUE : BORDER}`, 
                        cursor: "pointer", 
                        padding: "24px 28px", 
                        textAlign: "left", 
                        outline: "none", 
                        overflow: "hidden", 
                        borderRadius: 8, 
                        width: "100%", 
                        gap: 20 
                      }}
                    >
                      <img src={sp.portrait} alt={sp.name} style={{ width: isMobile ? 76 : 96, height: isMobile ? 76 : 96, borderRadius: "50%", objectFit: "cover" }} />
                      <div style={{ flex: 1 }}>
                        <span style={{ fontSize: "0.82rem", color: BLUE, display: "block", marginBottom: 4 }}>{sp.topic}</span>
                        <p style={{ fontWeight: 900, fontSize: "1.2rem", color: FG, margin: 0 }}>
                          {sp.name} <span style={{ fontWeight: 400, fontSize: "0.9rem", color: FG_MUTED }}>{sp.honorific}</span>
                        </p>
                        <p style={{ fontSize: "0.92rem", color: FG_MUTED, margin: "6px 0 0" }}>{sp.institution}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}
