'use client';

import { Lock, Unlock } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

interface Props {
  id: string;
  locked: boolean;
}

export const LockToggleActionsTopic = ({ locked }: Props) => {
  const t = useTranslations('forum.topics.actions');

  if (locked) {
    return (
      <DropdownMenuItem>
        <Unlock /> {t('unlock')}
      </DropdownMenuItem>
    );
  }

  return (
    <DropdownMenuItem>
      <Lock /> {t('lock')}
    </DropdownMenuItem>
  );
};
