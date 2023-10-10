'use client';

import { toast } from 'sonner';

import { Card, CardContent } from '@/components/ui/card';
import { HeaderOverviewSettings } from './header/header-overview-settings';

export const OverviewSettingsView = () => {
  return (
    <Card>
      <HeaderOverviewSettings />
      <CardContent>
        <button onClick={() => toast('This is a sonner toast')}>Render my toast</button>
      </CardContent>
    </Card>
  );
};
