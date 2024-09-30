import { Footer } from './footer';
import { Header } from './header/header';
import { QuickMenu } from './quick-menu/quick-menu';

export const ThemeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <QuickMenu />
    </>
  );
};
