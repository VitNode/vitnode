import { ModeToggle } from '@/components/modeToggle/mode-toggle';

export const HeaderAdmin = () => {
  return (
    <header className="ml-60 h-16 supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full bg-card/75 backdrop-blur shadow">
      <ModeToggle />
    </header>
  );
};
