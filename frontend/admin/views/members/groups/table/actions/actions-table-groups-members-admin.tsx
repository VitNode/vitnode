import { Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ShowAdminGroups } from '@/graphql/hooks';
import { EditGroupsMembersDialogAdmin } from './edit/edit-groups-members-dialog-admin';

interface Props {
  data: Omit<ShowAdminGroups, 'default' | 'root'>;
}

export const ActionsTableGroupsMembersAdmin = ({ data }: Props) => {
  const t = useTranslations('core');

  return (
    <div className="flex items-center justify-end">
      <EditGroupsMembersDialogAdmin data={data} />

      {!data.protected && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="destructiveGhost" size="icon">
                <Trash2 />
                <span className="sr-only">{t('delete')}</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>{t('delete')}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
};
