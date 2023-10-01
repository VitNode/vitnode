import { Link } from '@/i18n';
import { UserBar } from './user-bar/user-bar';

export const Header = () => {
  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b bg-card/75 backdrop-blur">
      <div className="container flex items-center gap-4 justify-between h-16">
        <Link href="/">Logo</Link>
        <UserBar />
      </div>
    </header>
  );
};
