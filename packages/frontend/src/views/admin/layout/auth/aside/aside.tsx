import { NavAdmin } from '../nav/nav-admin';

import { LogoVitNode } from '@/components/logo-vitnode';
import { LanguageSwitcher } from '@/components/switchers/language-switcher';
import { ThemeSwitcher } from '@/components/switchers/theme-switcher';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Link } from '@/navigation';

export const AsideAuthAdmin = () => {
  return (
    <aside className="bg-card fixed left-0 top-0 z-30 flex h-dvh flex-col border-e md:w-[240px] xl:w-[260px]">
      <div className="space-y-2 px-4 pt-2 md:px-3 md:pt-4">
        <div className="flex flex-row items-center justify-between border-b pb-4">
          <Link href="/admin/core/dashboard">
            <LogoVitNode className="h-8" />
          </Link>

          <div>Avatar</div>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="px-3 py-6">
          <NavAdmin />
        </div>
      </ScrollArea>

      <div className="flex flex-row items-center gap-1 border-t px-4 py-2">
        <LanguageSwitcher />
        <ThemeSwitcher />
      </div>
    </aside>
  );
};
