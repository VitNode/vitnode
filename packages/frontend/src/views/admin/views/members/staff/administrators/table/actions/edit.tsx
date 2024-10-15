import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Loader } from '@/components/ui/loader';
import { TooltipWrapper } from '@/components/ui/tooltip';
import { useTextLang } from '@/hooks/use-text-lang';
import { Pencil } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

const Content = React.lazy(async () =>
  import('../../create-edit-form/create-edit-form').then(module => ({
    default: module.CreateEditFormAdministratorsStaffAdmin,
  })),
);

export const EditActionTableAdministratorsStaffAdmin = (
  props: React.ComponentProps<typeof Content>,
) => {
  const t = useTranslations('admin.members.staff');
  const { convertText } = useTextLang();

  return (
    <Dialog>
      <TooltipWrapper content={t('administrators.edit.title')}>
        <DialogTrigger asChild>
          <Button
            ariaLabel={t('administrators.edit.title')}
            size="icon"
            variant="ghost"
          >
            <Pencil />
          </Button>
        </DialogTrigger>
      </TooltipWrapper>

      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{t('administrators.edit.title')}</DialogTitle>
          <DialogDescription>
            {`${
              props.data?.user_or_group.__typename === 'User'
                ? t('shared.user')
                : t('shared.group')
            }: ${
              props.data?.user_or_group.__typename === 'User'
                ? props.data?.user_or_group.name
                : convertText(props.data?.user_or_group.group_name)
            }`}
          </DialogDescription>
        </DialogHeader>

        <React.Suspense fallback={<Loader />}>
          <Content {...props} />
        </React.Suspense>
      </DialogContent>
    </Dialog>
  );
};
