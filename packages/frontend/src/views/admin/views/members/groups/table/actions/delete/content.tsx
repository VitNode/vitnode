import { useTranslations } from 'next-intl';

import { useDeleteGroupAdmin } from './hooks/use-delete-group-admin';
import { useTextLang } from '@/hooks/use-text-lang';
import {
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { ShowAdminGroups } from '@/graphql/types';
import { AutoFormInput } from '@/components/form/fields/input';
import { AutoForm } from '@/components/form/auto-form';

export const ContentDeleteGroupsMembersDialogAdmin = ({
  id,
  name,
}: Pick<ShowAdminGroups, 'id' | 'name'>) => {
  const t = useTranslations('admin.members.groups.delete');
  const tCore = useTranslations('core');
  const { convertText } = useTextLang();
  const formatName = convertText(name);
  const { onSubmit, formSchema } = useDeleteGroupAdmin({ name, id });

  return (
    <>
      <AutoForm
        formSchema={formSchema}
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
        fieldConfig={{
          name: {
            fieldType: AutoFormInput,
          },
        }}
      />

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
        formSchema={formSchema}
        onSubmit={onSubmit}
        submitButton={props => (
          <Button {...props} variant="destructive">
            {t('submit')}
          </Button>
        )}
        fieldConfig={{
          name: {
            fieldType: AutoFormInput,
          },
        }}
      />
    </>
  );
};
