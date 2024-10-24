import { ThemeLayout } from 'vitnode-frontend/views/theme/layout/theme-layout';

export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ThemeLayout>{children}</ThemeLayout>;
}
