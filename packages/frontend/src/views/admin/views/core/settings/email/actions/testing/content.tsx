import { AutoForm } from '@/components/form/auto-form';
import {
  AutoFormInput,
  AutoFormInputProps,
} from '@/components/form/fields/input';
import { AutoTextArea } from '@/components/form/fields/textarea';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { useTranslations } from 'next-intl';

import { useTestingEmailAdmin } from './hooks/use-testing-email-admin';

export const ContentTestingActionEmailSettingsAdmin = () => {
  const t = useTranslations('admin.core.settings.email.test');
  const { onSubmit, formSchema } = useTestingEmailAdmin();

  return (
    <AutoForm
      fields={[
        {
          id: 'to',
          label: t('to'),
          component: AutoFormInput,
          componentProps: {
            type: 'email',
          } as AutoFormInputProps,
        },
        {
          id: 'subject',
          label: t('subject'),
          component: AutoFormInput,
        },
        {
          id: 'message',
          label: t('message'),
          component: AutoTextArea,
        },
      ]}
      formSchema={formSchema}
      onSubmit={onSubmit}
      submitButton={props => (
        <DialogFooter>
          <Button {...props}>{t('send_testing_email')}</Button>
        </DialogFooter>
      )}
    />
  );
};
