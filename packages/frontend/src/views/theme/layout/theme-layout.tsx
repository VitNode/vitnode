import { useLocale } from 'next-intl';

import { Header } from './header/header';
import { Footer } from './footer';
import { QuickMenu } from './quick-menu/quick-menu';

interface Props {
  children: React.ReactNode;
}

export const ThemeLayout = ({ children }: Props) => {
  const locale = useLocale();

  return (
    <>
      <Header />
      <main className="my-4">{children}</main>
      <Footer locale={locale} />
      <QuickMenu />
    </>
  );
};
