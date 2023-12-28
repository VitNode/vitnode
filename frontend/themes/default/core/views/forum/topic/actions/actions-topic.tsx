import { ChevronDown, Settings } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { LockToggleActionsTopic } from '@/themes/default/core/views/forum/topic/actions/lock-toggle/lock-toggle';

interface Props {
  id: string;
  state: {
    locked: boolean;
  };
}

export const ActionsTopic = ({ id, state }: Props) => {
  const t = useTranslations('forum.topics.actions');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Settings /> {t('title')} <ChevronDown />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <LockToggleActionsTopic id={id} locked={state.locked} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
