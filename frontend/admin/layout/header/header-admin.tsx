import { ModeToggle } from '@/components/modeToggle/mode-toggle';

export const HeaderAdmin = () => {
  return (
    <header className="sm:ml-60 h-16 sticky top-0 z-50 bg-card backdrop-blur">
      <ModeToggle />
    </header>
  );
};
