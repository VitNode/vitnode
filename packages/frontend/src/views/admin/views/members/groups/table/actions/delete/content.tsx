import { AutoForm } from '@/components/form/auto-form';
import { AutoFormInput } from '@/components/form/fields/input';
import {
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { ShowAdminGroups } from '@/graphql/types';
import { useTextLang } from '@/hooks/use-text-lang';
import { useTranslations } from 'next-intl';

import { useDeleteGroupAdmin } from './hooks/use-delete-group-admin';

export const ContentDeleteGroupsMembersDialogAdmin = ({
  id,
  name,
}: Pick<ShowAdminGroups, 'id' | 'name'>) => {
  const t = useTranslations('admin.members.groups.delete');
  const tCore = useTranslations('core.global');
  const { convertText } = useTextLang();
  const formatName = convertText(name);
  const { onSubmit, formSchema } = useDeleteGroupAdmin({ name, id });

  return (
    <>
      <AlertDialogHeader>
        <AlertDialogTitle>{tCore('are_you_absolutely_sure')}</AlertDialogTitle>
        <AlertDialogDescription className="flex flex-col gap-4">
          <p>{t('text')}</p>
          <p>
            {t.rich('form_confirm_text', {
              text: () => (
                <span className="text-foreground font-semibold">
                  {formatName}
                </span>
              ),
            })}
          </p>
        </AlertDialogDescription>
      </AlertDialogHeader>

      <AutoForm
        fields={[
          {
            id: 'name',
            component: AutoFormInput,
          },
        ]}
        formSchema={formSchema}
        onSubmit={onSubmit}
        submitButton={props => (
          <AlertDialogFooter className="mt-6">
            <AlertDialogCancel asChild>
              <Button type="button" variant="outline">
                {tCore('cancel')}
              </Button>
            </AlertDialogCancel>
            <Button {...props}>{t('submit')}</Button>
          </AlertDialogFooter>
        )}
      />
    </>
  );
};
