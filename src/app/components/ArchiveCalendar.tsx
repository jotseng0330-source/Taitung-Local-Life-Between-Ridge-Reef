const FONT_TC   = "var(--font-qijic)";
const FONT_NOTO = "'Noto Sans', 'Helvetica Neue', Arial, sans-serif";
const FONT_MONO = "'DM Mono', 'Courier New', monospace";
const ACCENT    = "#78C2C4";  /* 台東藍 */

const MONTHS_TC = [
  "1 月","2 月","3 月","4 月","5 月","6 月",
  "7 月","8 月","9 月","10 月","11 月","12 月",
];
const WEEKDAYS_TC = ["日","一","二","三","四","五","六"];

interface ArchiveCalendarProps {
  targetYear: number;
  targetMonth: number;
  targetDay: number;
}

export function ArchiveCalendar({ targetYear, targetMonth, targetDay }: ArchiveCalendarProps) {
  const year = targetYear;
  const month = targetMonth;

  const totalDays = new Date(year, month, 0).getDate();
  const offset = new Date(year, month - 1, 1).getDay();

  const cells: (number | null)[] = [
    ...Array<null>(offset).fill(null),
    ...Array.from({ length: totalDays }, (_, i) => i + 1),
  ];

  return (
    <div style={{ width: "100%", fontFamily: FONT_NOTO }}>
      <style>{`
        @font-face {
          font-family: 'QIJIC'; 
          src: url('./fonts/qiji-combo.ttf') format('truetype');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }
      `}</style>

      <div style={{
        textAlign: "center",
        marginBottom: 16,
        background: "rgba(255,255,255,0.02)",
        padding: "10px 12px",
        border: "1px solid rgba(255,255,255,0.05)"
      }}>
        <p style={{
          fontFamily: FONT_NOTO,
          fontWeight: 700,
          fontSize: "1.1rem", 
          letterSpacing: "0.04em",
          color: "#ffffff", 
          margin: 0,
        }}>
          {year} 年 {MONTHS_TC[month - 1]}
        </p>
        <p style={{
          fontFamily: FONT_MONO, fontSize: "0.82rem",
          color: ACCENT, margin: "4px 0 0", textTransform: "uppercase",
        }}>
          ● 系統自動抓取日期
        </p>
      </div>

      {/* ── 星期欄位 ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", marginBottom: 6 }}>
        {WEEKDAYS_TC.map(d => (
          <div key={d} style={{
            textAlign: "center", paddingBottom: 8, fontFamily: FONT_NOTO, fontSize: "0.9rem",
            fontWeight: 500, letterSpacing: "0.06em", color: "rgba(237,237,240,0.4)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}>
            {d}
          </div>
        ))}
      </div>

      {/* ── 日期網格 ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: "6px 0", paddingTop: 4 }}>
        {cells.map((day, idx) => {
          if (day === null) return <div key={`e-${idx}`} />;

          const isSel = day === targetDay;

          return (
            <div key={`${year}-${month}-${day}`} style={{ display: "flex", justifyContent: "center", padding: "2px 0", alignItems: "center" }}>
              <div
                style={{
                  width: "100%", maxWidth: 38, aspectRatio: "1 / 1",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  borderRadius: "50%",
                  border: isSel ? `2px solid ${ACCENT}` : "none",
                  fontFamily: FONT_MONO, fontSize: "0.96rem",
                  fontWeight: isSel ? 700 : 400,
                  letterSpacing: "0.02em",
                  background: isSel ? "rgba(120,194,196,0.2)" : "transparent",
                  color: isSel ? ACCENT : "rgba(255,255,255,0.15)",
                  boxShadow: isSel ? `0 0 10px ${ACCENT}40` : "none"
                }}
              >
                {day}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── 圖例 ── */}
      <div style={{ marginTop: 20, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: 24, justifyContent: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(120,194,196,0.25)", border: `2px solid ${ACCENT}` }} />
          <span style={{ fontFamily: FONT_NOTO, fontSize: "0.8rem", color: ACCENT }}>目前選定報導日</span>
        </div>
      </div>
    </div>
  );
}