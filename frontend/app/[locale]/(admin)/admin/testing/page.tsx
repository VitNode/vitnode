import { CONFIG } from "@/config/config";

export default function Page() {
  return (
    <div className="flex h-screen bg-card">
      <div className="flex-1 flex items-center justify-center">
        <iframe
          title="YouTube video player"
          className="w-3/4 h-3/4 border bg-background rounded-md"
          src={CONFIG.frontend_url}
        />
      </div>

      <div className="w-96 flex-shrink-0 shadow-lg border-l p-5">
        Theme Editor
      </div>
    </div>
  );
}
