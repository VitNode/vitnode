import { ThemeButton } from '@/components/theme-button';

export const Footer = () => {
  return (
    <footer className="border-t bg-card/75">
      <div className="container py-3 flex items-center gap-4 justify-between">
        <ThemeButton />
      </div>
    </footer>
  );
};
