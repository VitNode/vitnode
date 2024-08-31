import { AutoForm } from '@/components/auto-form/auto-form';
import {
  AutoFormInput,
  AutoFormInputProps,
} from '@/components/auto-form/fields/input';
import { AutoTextArea } from '@/components/auto-form/fields/textarea';
import { Button } from '@/components/ui/button';
import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useTranslations } from 'next-intl';

import { useTestingEmailAdmin } from './hooks/use-testing-email-admin';

export const ContentTestingActionEmailSettingsAdmin = () => {
  const t = useTranslations('admin.core.settings.email.test');
  const { onSubmit, formSchema } = useTestingEmailAdmin();

  return (
    <>
      <DialogHeader>
        <DialogTitle>{t('title')}</DialogTitle>
      </DialogHeader>

      <AutoForm
        fields={[
          {
            id: 'from',
            component: AutoFormInput,
            componentProps: {
              type: 'email',
            } as AutoFormInputProps,
          },
          {
            id: 'to',
            component: AutoFormInput,
            componentProps: {
              type: 'email',
            } as AutoFormInputProps,
          },
          {
            id: 'subject',
            component: AutoFormInput,
          },
          {
            id: 'message',
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
    </>
  );
};
