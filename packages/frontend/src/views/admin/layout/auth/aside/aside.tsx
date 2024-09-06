import { LogoVitNode } from '@/components/logo-vitnode';
import { LanguageSwitcher } from '@/components/switchers/language-switcher';
import { ThemeSwitcher } from '@/components/switchers/theme-switcher';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CONFIG } from '@/helpers/config-with-env';
import { Link } from '@/navigation';

import { NavAdmin } from '../nav/nav-admin';
import { AvatarAsideAuthAdmin } from './avatar';
import { SearchAsideAuthAdmin } from './search/search';

export const AsideAuthAdmin = () => {
  return (
    <aside className="bg-card fixed left-0 top-0 z-30 hidden h-dvh flex-col border-e md:flex md:w-[240px] xl:w-[260px]">
      {CONFIG.node_development && (
        <div
          className="absolute left-0 top-0 z-50 h-1 w-full"
          style={{
            backgroundImage:
              'repeating-linear-gradient(-55deg,#000, #000 20px, #ffb103 20px, #feb100 40px)',
          }}
        />
      )}

      <div className="space-y-2 px-4 pt-2 md:px-3 md:pt-4">
        <div className="flex flex-row items-center justify-between pb-2">
          <Link href="/admin/core/dashboard">
            <LogoVitNode className="h-8" small />
          </Link>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeSwitcher />

            <AvatarAsideAuthAdmin />
          </div>
        </div>

        <SearchAsideAuthAdmin />
      </div>

      <ScrollArea className="flex-1">
        <div className="px-3 py-6">
          <NavAdmin />
        </div>
      </ScrollArea>
    </aside>
  );
};
