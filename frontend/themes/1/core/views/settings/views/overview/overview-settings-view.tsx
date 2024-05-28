import { HeaderOverviewSettings } from "./header/header-overview-settings";

export default function OverviewSettingsView() {
  return (
    <>
      <HeaderOverviewSettings />
      <div className="size-10 bg-primary" /> primary
      <div className="bg-secondary p-10 text-secondary-foreground">
        secondary
      </div>
      <div className="size-10 bg-muted" /> muted
      <div className="size-10 bg-accent" /> accent
      <div className="bg-destructive p-10 text-destructive-foreground">
        destructive
      </div>
      <div className="bg-cover p-10 text-cover-foreground">base</div>
      <div className="size-10 bg-border" /> border
      <div className="size-10 bg-input" /> input
      <div className="size-10 bg-ring" /> ring
    </>
  );
}
