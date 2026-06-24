import { useState, useRef, useEffect } from "react";
import { ArchiveCalendar } from "./ArchiveCalendar";
import Header from "./Header";
import ScrollHint from "./ScrollHint";
import type { NavPage } from "../types/navigation";
import type { SpeakerId } from "./StoryPage";
import { REPORTS_BY_SPEAKER, getReportImagePaths } from "./CalendarPage";

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
      { speakerId: "1-1" as SpeakerId, name: "孟祥瀚", honorific: "退休教授", institution: "國立中興大學歷史學系", topic: "交通發展", portrait: "https://ws.th.gov.tw/002/TH/new_site/upload/show/2a757d4d76238f0d6b0006c42b2e116e.jpg" },
    ],
  },
  {
    themeId: 2, index: "02", title: "地方藝文與文化人", tag: "文化藝術",
    speakers: [
      { speakerId: "2-0" as SpeakerId, name: "徐千惠", honorific: "老師", institution: "國立台東高中退休教師", topic: "台東兒童文學發展", portrait: "https://scontent.ftpe8-4.fna.fbcdn.net/v/t39.30808-6/651170369_26603754445922869_2724252160407163222_n.jpg?stp=dst-jpg_tt6&cstp=mx1357x2048&ctp=s1357x2048&_nc_cat=104&ccb=1-7&_nc_sid=cf85f3&_nc_ohc=blYpYy5KFVUQ7kNvwHEZOFZ&_nc_oc=Adr4-5IirUd8wDZj5OhrZT_QbgNvkRW62Pd2VZTUWxHHIJ4Jwn-eiZMMNy5R5_Lokx2uMjQWEYnJahRmeqwS28qT&_nc_zt=23&_nc_ht=scontent.ftpe8-4.fna&_nc_gid=k_HTYuPNbJswa4hNn1IuyQ&_nc_ss=7b2a8&oh=00_Af8fk7bxT5XDChyu2fIubwezdtTZXdU7jmrVCOY-3gQryQ&oe=6A3630EC" }
    ],
  },
  {
    themeId: 3, index: "03", title: "地方特色產業發展", tag: "產業史",
    speakers: [
      { speakerId: "3-0" as SpeakerId, name: "許秀孟", honorific: "教授", institution: "國立台東大學文化資源與休閒產業學系", topic: "魚苗與香茅", portrait: "https://nrchisp.nttu.edu.tw/var/file/63/1063/img/674163412.jpg" },
    ],
  },
  {
    themeId: 4, index: "04", title: "祖先文化與土地", tag: "民俗信仰",
    speakers: [
      { speakerId: "4-0" as SpeakerId, name: "劉烱錫", honorific: "主任", institution: "國立台東大學友善環境農漁產業發展中心", topic: "原住民族部落永續發展", portrait: "https://ils.nttu.edu.tw/var/file/20/1020/img/423586424.jpg" }, 
    ],
  },
];

const AVAILABLE_SPEAKERS = THEME_GROUPS.flatMap((group) =>
  group.speakers.map((speaker) => ({
    ...speaker,
    themeTitle: group.title,
    themeIndex: group.index,
    themeTag: group.tag,
  }))
);

interface Props {
  defaultThemeId?:  number;
  onNavigate:       (page: NavPage, themeId?: number) => void;
  onSelectSpeaker:  (speakerId: SpeakerId) => void;
}

export function SpeakerPage({ defaultThemeId, onNavigate, onSelectSpeaker }: Props) {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [activeSpeakerId, setActiveSpeakerId] = useState<SpeakerId>("1-1");
  const [reportIndex, setReportIndex] = useState(0);
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

  useEffect(() => {
    setReportIndex(0);
  }, [activeSpeakerId]);

  const currentSpeaker = AVAILABLE_SPEAKERS.find((speaker) => speaker.speakerId === activeSpeakerId) ?? AVAILABLE_SPEAKERS[0];
  const currentReports = REPORTS_BY_SPEAKER[activeSpeakerId] ?? [];
  const currentReport = currentReports[reportIndex];
  const { previewImage, fullImage } = currentReport ? getReportImagePaths(currentSpeaker?.name ?? "", currentReport.date) : { previewImage: "/news/placeholder-newspaper.svg", fullImage: "/news/placeholder-newspaper.svg" };

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

          <div style={{ borderTop: `1px solid ${BORDER}`, marginTop: 36, paddingTop: 32 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 24, height: 24, borderRadius: "50%", background: BLUE, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: FONT_MONO, fontSize: "0.82rem", fontWeight: 700, color: BG }}>3</span>
              </div>
              <h2 style={{ fontFamily: FONT_NOTO, fontWeight: 700, fontSize: "0.95rem", color: FG, margin: 0 }}>文獻時空調閱中心</h2>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 16 }}>
              {AVAILABLE_SPEAKERS.map((speaker) => (
                <button
                  key={speaker.speakerId}
                  onClick={() => {
                    setActiveSpeakerId(speaker.speakerId);
                    setReportIndex(0);
                  }}
                  style={{
                    padding: "8px 12px",
                    borderRadius: 999,
                    border: activeSpeakerId === speaker.speakerId ? `1px solid ${BLUE}` : `1px solid ${BORDER}`,
                    background: activeSpeakerId === speaker.speakerId ? "rgba(120,194,196,0.12)" : "rgba(255,255,255,0.03)",
                    color: FG,
                    cursor: "pointer",
                    fontFamily: FONT_NOTO,
                    fontSize: "0.9rem"
                  }}
                >
                  {speaker.name}
                </button>
              ))}
            </div>

            {currentReport && currentSpeaker && (
              <div style={{ border: `1px solid ${BORDER}`, borderRadius: 14, background: "rgba(255,255,255,0.03)", padding: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, borderBottom: `1px solid ${BORDER}`, paddingBottom: 12, marginBottom: 18 }}>
                  <div>
                    <div style={{ fontFamily: FONT_MONO, color: BLUE, fontSize: "0.85rem", marginBottom: 4 }}>{currentSpeaker.themeIndex} · {currentSpeaker.themeTitle}</div>
                    <div style={{ fontFamily: FONT_NOTO, fontSize: "1.15rem", fontWeight: 700, color: FG }}>{currentReport.title}</div>
                  </div>
                  <div style={{ fontFamily: FONT_MONO, color: FG_MUTED, fontSize: "0.82rem", whiteSpace: "nowrap" }}>日期 {currentReport.date}</div>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 24, alignItems: "flex-start" }}>
                  <div style={{ flex: "1 1 320px", minWidth: 0 }}>
                    <div style={{ fontSize: "0.92rem", color: BLUE, marginBottom: 12, fontFamily: FONT_NOTO }}>本報記者：{currentReport.reporter}</div>
                    <div style={{ fontSize: "1.02rem", color: "rgba(237,237,240,0.82)", lineHeight: 1.8, fontFamily: FONT_NOTO, borderTop: `1px solid ${BORDER}`, paddingTop: 14 }}>{currentReport.summary}</div>
                  </div>

                  <div style={{ flex: "0 0 min(320px, 100%)", width: isMobile ? "100%" : 320 }}>
                    <div style={{ marginBottom: 12 }}>
                      <ArchiveCalendar targetYear={currentReport.year} targetMonth={currentReport.month} targetDay={currentReport.day} />
                    </div>
                    <button
                      onClick={() => window.open(`/newspaper-preview.html?src=${encodeURIComponent(fullImage)}`, "_blank", "noopener,noreferrer")}
                      style={{
                        width: "100%",
                        padding: 0,
                        border: `1px solid ${BORDER}`,
                        background: "rgba(255,255,255,0.03)",
                        borderRadius: 12,
                        overflow: "hidden",
                        cursor: "pointer",
                        textAlign: "left",
                        color: FG,
                        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)"
                      }}
                    >
                      <img src={previewImage} alt={`報紙預覽：${currentReport.title}`} style={{ width: "100%", height: 180, objectFit: "cover", display: "block" }} />
                      <div style={{ padding: "10px 12px", fontFamily: FONT_NOTO, fontSize: "0.92rem", color: FG, borderTop: `1px solid ${BORDER}` }}>
                        <div style={{ fontWeight: 700, color: BLUE, marginBottom: 4 }}>開啟報紙預覽</div>
                        <div style={{ color: FG_MUTED, fontSize: "0.84rem" }}>點擊可查看完整報紙圖片內容</div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}