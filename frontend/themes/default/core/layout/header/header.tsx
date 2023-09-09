import Link from 'next-intl/link';

import { UserBar } from './user-bar/user-bar';

export const Header = () => {
  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b bg-card/75 backdrop-blur">
      <div className="max-w-[120rem] mx-auto px-5 py-3 flex items-center gap-4 justify-between">
        <Link href="/">Logo</Link>
        <UserBar />
      </div>
    </header>
  );
};
