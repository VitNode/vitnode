import { Pencil } from 'lucide-react';
import { Suspense, lazy } from 'react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Loader } from '@/components/loader/loader';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ShowAdminGroups } from '@/graphql/hooks';
import { useTextLang } from '@/hooks/core/use-text-lang';

const CreateEditFormGroupsMembersAdmin = lazy(() =>
  import('../../create-edit-form/create-edit-form-groups-members-admin').then(module => ({
    default: module.CreateEditFormGroupsMembersAdmin
  }))
);

interface Props {
  data: Pick<ShowAdminGroups, 'id' | 'name'>;
}

export const EditGroupsMembersDialogAdmin = ({ data }: Props) => {
  const t = useTranslations('core');
  const { convertText } = useTextLang();

  return (
    <Dialog>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <Pencil />
                <span className="sr-only">{t('edit')}</span>
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>{t('edit')}</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DialogContent className="max-w-3xl">
        <Suspense fallback={<Loader />}>
          <CreateEditFormGroupsMembersAdmin
            title={t('edit_with_value', { value: convertText(data.name) })}
            data={data}
          />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
};
