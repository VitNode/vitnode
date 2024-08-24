import { LanguageSwitcher } from '@/components/switchers/language-switcher';
import { ThemeSwitcher } from '@/components/switchers/theme-switcher';
import { buttonVariants } from '@/components/ui/button';
import { DrawerClose } from '@/components/ui/drawer';
import { AvatarUser } from '@/components/ui/user/avatar';
import { useSession } from '@/hooks/use-session';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';

export const HeaderDrawerQuickMenu = () => {
  const t = useTranslations('core');
  const { session } = useSession();

  if (!session)
    return (
      <div className="p-5">
        <div className="flex gap-5">
          <DrawerClose asChild>
            <Link
              className={buttonVariants({
                variant: 'outline',
                className: 'flex-1',
              })}
              href="/login"
            >
              {t('user-bar.sign_in')}
            </Link>
          </DrawerClose>

          <DrawerClose asChild>
            <Link
              className={buttonVariants({
                className: 'flex-1',
              })}
              href="/register"
            >
              {t('user-bar.sign_up')}
            </Link>
          </DrawerClose>
        </div>

        <div className="mt-5 flex justify-center gap-2">
          <LanguageSwitcher />
          <ThemeSwitcher />
        </div>
      </div>
    );

  const { email, name, ...rest } = session;

  return (
    <div className="flex items-center justify-between gap-2 p-5">
      <div className="flex flex-row items-center gap-2 space-y-0 text-left">
        <AvatarUser sizeInRem={1.75} user={{ name, ...rest }} />
        <div className="flex flex-col gap-1">
          <p className="text-base font-medium leading-none">{name}</p>
          <p className="text-muted-foreground text-sm leading-none">{email}</p>
        </div>
      </div>

      <div className="flex gap-2">
        <LanguageSwitcher />
        <ThemeSwitcher />
      </div>
    </div>
  );
};
