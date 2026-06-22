import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

const BLUE = "#78C2C4";

interface Props {
  label?: string;
  show?: boolean;
}

export function ScrollHint({ label = "往下滑看更多內容", show = true }: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasOverflow, setHasOverflow] = useState(false);

  useEffect(() => {
    if (!show) return;

    const revealTimer = window.setTimeout(() => setIsVisible(true), 650);

    const updateVisibility = () => {
      const scrollRoot = document.documentElement;
      const scrollHeight = scrollRoot.scrollHeight;
      const viewportHeight = window.innerHeight;
      const remaining = scrollHeight - (window.scrollY + viewportHeight);
      const overflowExists = scrollHeight > viewportHeight + 24;

      setHasOverflow(overflowExists);
      if (overflowExists && remaining < 160) {
        setIsVisible(false);
      } else if (overflowExists) {
        setIsVisible(true);
      }
    };

    const scheduleUpdate = () => {
      window.requestAnimationFrame(updateVisibility);
    };

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("load", scheduleUpdate);
    document.fonts?.ready.then(scheduleUpdate).catch(() => {
      scheduleUpdate();
    });

    const resizeObserver = new ResizeObserver(scheduleUpdate);
    resizeObserver.observe(document.documentElement);
    scheduleUpdate();

    return () => {
      window.clearTimeout(revealTimer);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("load", scheduleUpdate);
      resizeObserver.disconnect();
    };
  }, [show]);

  if (!show || !isVisible || !hasOverflow) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        left: "50%",
        bottom: "calc(env(safe-area-inset-bottom, 0px) + 16px)",
        transform: "translateX(-50%)",
        zIndex: 9999,
        pointerEvents: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
      }}
    >
      <style>{`
        @keyframes scrollHintFloat {
          0%, 100% { transform: translateY(0); opacity: 0.9; }
          50% { transform: translateY(5px); opacity: 1; }
        }
        @keyframes scrollHintGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(120, 194, 196, 0.08); }
          50% { box-shadow: 0 0 0 10px rgba(120, 194, 196, 0); }
        }
      `}</style>
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: "50%",
          border: `1px solid rgba(120, 194, 196, 0.45)`,
          background: "rgba(7,7,13,0.72)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: "blur(8px)",
          animation: "scrollHintGlow 1.8s ease-in-out infinite",
        }}
      >
        <ChevronDown style={{ width: 18, height: 18, color: BLUE, animation: "scrollHintFloat 1.8s ease-in-out infinite" }} />
      </div>
      <span
        style={{
          color: "rgba(237,237,240,0.75)",
          fontFamily: "'DM Mono','Courier New',monospace",
          fontSize: "0.75rem",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          textAlign: "center",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
    </div>
  );
}

export default ScrollHint;