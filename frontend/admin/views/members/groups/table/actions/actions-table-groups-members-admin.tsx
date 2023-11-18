import { Pencil, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button, buttonVariants } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Link } from '@/i18n';
import { ShowAdminGroups } from '@/graphql/hooks';

interface Props {
  data: ShowAdminGroups;
}

export const ActionsTableGroupsMembersAdmin = ({ data }: Props) => {
  const t = useTranslations('core');

  return (
    <div className="flex items-center justify-end">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href={`/admin/members/groups/${data.id}`}
              className={buttonVariants({
                variant: 'ghost',
                size: 'icon'
              })}
            >
              <Pencil />
              <span className="sr-only">{t('edit')}</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent>{t('edit')}</TooltipContent>
        </Tooltip>
      </TooltipProvider>

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
