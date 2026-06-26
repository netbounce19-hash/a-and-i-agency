import Desktop from "@/components/Desktop";
import Taskbar from "@/components/Taskbar";

export default function Home() {
  return (
    <main
      className="fixed inset-0 flex flex-col"
      style={{ background: "var(--bg-main)" }}
    >
      {/* Desktop fills all space above taskbar */}
      <div className="flex-1 relative overflow-hidden" style={{ paddingBottom: "40px" }}>
        <Desktop />
      </div>

      {/* Taskbar pinned at bottom */}
      <Taskbar />
    </main>
  );
}
