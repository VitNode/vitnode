'use client';

import { toast } from 'sonner';

import { Card, CardContent } from '@/components/ui/card';
import { HeaderOverviewSettings } from './header/header-overview-settings';

export const OverviewSettingsView = () => {
  return (
    <Card>
      <HeaderOverviewSettings />
      <CardContent>
        <button
          onClick={() =>
            toast('Event has been created', {
              action: {
                label: 'Test 123',
                // eslint-disable-next-line no-console
                onClick: () => console.log('Undo')
              }
            })
          }
        >
          Render my toast
        </button>
      </CardContent>
    </Card>
  );
};
