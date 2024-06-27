import { useLocale } from 'next-intl';

import { Header } from './header/header';
import { Footer } from './footer';
import { QuickMenu } from './quick-menu/quick-menu';
import './global.css';

interface Props {
  children: React.ReactNode;
}

export const ThemeLayout = ({ children }: Props) => {
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
