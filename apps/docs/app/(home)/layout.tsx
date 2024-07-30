import { HomeLayout } from 'fumadocs-ui/home-layout';
import { baseOptions } from '@/app/layout.config';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <HomeLayout {...baseOptions}>{children}</HomeLayout>;
}
