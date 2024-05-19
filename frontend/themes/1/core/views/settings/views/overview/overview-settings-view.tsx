import { Card } from "@/components/ui/card";
import { HeaderOverviewSettings } from "./header/header-overview-settings";

export default function OverviewSettingsView() {
  return (
    <Card>
      <HeaderOverviewSettings />
      <div className="size-10 bg-primary" /> primary
      <div className="size-10 bg-secondary" /> secondary
      <div className="size-10 bg-muted" /> muted
      <div className="size-10 bg-accent" /> accent
      <div className="bg-destructive p-10 text-destructive-foreground">
        destructive
      </div>
      <div className="bg-base p-10 text-base-foreground">base</div>
      <div className="size-10 bg-border" /> border
      <div className="size-10 bg-input" /> input
      <div className="size-10 bg-ring" /> ring
    </Card>
  );
}
