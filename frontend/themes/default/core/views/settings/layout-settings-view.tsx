import { ReactNode } from 'react';

import { NavSettings } from './nav/nav-settings';

interface Props {
  children: ReactNode;
}

export const LayoutSettingsView = ({ children }: Props) => {
  return (
    <div className="lg:gap-8 flex flex-col lg:flex-row gap-4">
      <NavSettings />
      <main className="flex-grow">{children}</main>
    </div>
  );
};
