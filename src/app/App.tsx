import { useEffect, useState } from "react";
import { HomePage }    from "./components/HomePage";
import { CalendarPage } from "./components/CalendarPage";
import { SpeakerPage }  from "./components/SpeakerPage";
import { StoryPage }    from "./components/StoryPage";
import { Footer }       from "./components/Footer";
import type { NavPage }   from "./types/navigation";
import type { SpeakerId } from "./components/StoryPage";

type Screen =
  | { type: "landing" }
  | { type: "calendar"; themeId?: number }
  | { type: "speaker"; scrollToTheme?: number }
  | { type: "speakerProfile"; speakerId: SpeakerId };

export default function App() {
  const [screen, setScreen] = useState<Screen>({ type: "landing" });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const TRANS_MS = 200;

  function performSetScreen(page: NavPage, themeId?: number) {
    if (page === "landing")  setScreen({ type: "landing" });
    if (page === "calendar") setScreen({ type: "calendar", themeId });
    if (page === "speaker")  setScreen({ type: "speaker", scrollToTheme: themeId });
  }

  function navigate(page: NavPage, themeId?: number) {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      performSetScreen(page, themeId);
      // small delay to allow new content to render, then fade in
      setTimeout(() => setIsTransitioning(false), 20);
    }, TRANS_MS);
  }

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const payload = event.data;
      if (!payload || payload.type !== "return-to-app") return;

      const page = payload.page as NavPage | undefined;
      const themeId = payload.themeId ? Number(payload.themeId) : undefined;
      if (page === "calendar") {
        setScreen({ type: "calendar", themeId });
      } else if (page === "speaker") {
        setScreen({ type: "speaker", scrollToTheme: themeId });
      } else if (page === "speakerProfile") {
        setScreen({ type: "speakerProfile", speakerId: payload.speakerId as SpeakerId });
      } else {
        setScreen({ type: "landing" });
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  let content = null;
  if (screen.type === "calendar") {
    content = <CalendarPage defaultThemeId={screen.themeId} onNavigate={navigate} />;
  } else if (screen.type === "speakerProfile") {
    content = (
      <StoryPage
        speakerId={screen.speakerId}
        onBack={() => setScreen({ type: "speaker" })}
        onNavigate={navigate}
      />
    );
  } else if (screen.type === "speaker") {
    content = (
      <SpeakerPage
        defaultThemeId={screen.scrollToTheme}
        onNavigate={navigate}
        onSelectSpeaker={(speakerId) => setScreen({ type: "speakerProfile", speakerId })}
      />
    );
  } else {
    content = (
      <HomePage
        onCardClick={(id) => navigate("speaker", id)}
        onNavigate={navigate}
      />
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", transition: `opacity ${TRANS_MS}ms ease, transform ${TRANS_MS}ms ease`, opacity: isTransitioning ? 0 : 1, transform: isTransitioning ? "translateY(6px)" : "translateY(0)" }}>
      <div style={{ flex: "1 0 auto" }}>{content}</div>
      <Footer />
    </div>
  );
}
