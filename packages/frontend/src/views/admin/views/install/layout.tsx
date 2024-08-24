import { LogoVitNode } from '@/components/logo-vitnode';
import { ThemeSwitcher } from '@/components/switchers/theme-switcher';
import { Card } from '@/components/ui/card';
import { useTranslations } from 'next-intl';

export const InstallConfigLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const t = useTranslations('admin.configs');

  return (
    <div className="container my-10">
      <div className="mb-5 flex items-center justify-center">
        <LogoVitNode className="h-16" />
      </div>
      {children}
      <Card className="p-5 text-center sm:hidden">
        {t('mobile_not_supported')}
      </Card>

      <div className="mt-5 flex flex-col items-center justify-center gap-4">
        <ThemeSwitcher />
      </div>
    </div>
  );
};
