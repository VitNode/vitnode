import {
  VITNODE_DOCS_URL,
  VITNODE_SPONSOR_URL,
  VITNODE_WEBSITE_URL,
} from "@vitnode/core/lib/docs-links";
import { Heart } from "lucide-react";

export const MainFooter = () => (
  <footer className="border-t">
    <div className="text-muted-foreground container mx-auto flex flex-col items-center justify-between gap-3 px-4 py-6 text-sm sm:flex-row">
      <p>
        Powered by{" "}
        <a
          className="text-foreground font-medium underline-offset-4 hover:underline"
          href={VITNODE_WEBSITE_URL}
          rel="noopener noreferrer"
          target="_blank"
        >
          VitNode
        </a>
      </p>

      <nav aria-label="VitNode" className="flex items-center gap-5">
        <a
          className="hover:text-foreground transition-colors"
          href={VITNODE_DOCS_URL}
          rel="noopener noreferrer"
          target="_blank"
        >
          Docs
        </a>
        <a
          className="hover:text-foreground flex items-center gap-1.5 transition-colors"
          href={VITNODE_SPONSOR_URL}
          rel="noopener noreferrer"
          target="_blank"
        >
          <Heart className="size-3.5" />
          Sponsor
        </a>
      </nav>
    </div>
  </footer>
);
