import { ModeToggle } from '@/components/modeToggle/mode-toggle';

export const Footer = () => {
  return (
    <footer className="border-t bg-card/75">
      <div className="container py-3 flex items-center gap-4 justify-between">
        <ModeToggle />
      </div>
    </footer>
  );
};
