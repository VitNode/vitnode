'use client';

import { ChevronDown, Lock, Settings, Unlock } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

interface Props {
  state: {
    locked: boolean;
  };
}

export const ActionsTopic = ({ state }: Props) => {
  const t = useTranslations('forum.topics.actions');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Settings /> {t('title')} <ChevronDown />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        {state.locked ? (
          <DropdownMenuItem>
            <Unlock /> {t('unlock')}
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem>
            <Lock /> {t('lock')}
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
