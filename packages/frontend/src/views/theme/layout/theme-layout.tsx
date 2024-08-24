import { useLocale } from 'next-intl';

import { Footer } from './footer';
import { Header } from './header/header';
import { QuickMenu } from './quick-menu/quick-menu';

export const ThemeLayout = ({ children }: { children: React.ReactNode }) => {
  const locale = useLocale();

  return (
    <>
      <Header />
      {children}
      <Footer locale={locale} />
      <QuickMenu />
    </>
  );
};
