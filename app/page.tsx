import ScrollyCanvas from "@/components/ScrollyCanvas";
import Projects from "@/components/Projects";
import SocialDock from "@/components/SocialDock";
import ScrollProgress from "@/components/ScrollProgress";
import CursorGlow from "@/components/CursorGlow";
import ParticleNet from "@/components/ParticleNet";

export default function Home() {
  return (
    <main className="bg-[#121212] min-h-[100dvh] font-sans selection:bg-white/30 relative overflow-x-hidden">
      <CursorGlow />
      <ScrollProgress />
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <ParticleNet />
      </div>
      <SocialDock />
      <ScrollyCanvas />
      <Projects />
    </main>
  );
}
