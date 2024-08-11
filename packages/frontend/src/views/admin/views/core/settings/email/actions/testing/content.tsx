import { useTranslations } from 'next-intl';

import { useTestingEmailAdmin } from './hooks/use-testing-email-admin';
import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AutoForm } from '@/components/ui/auto-form';
import { AutoFormInput } from '@/components/ui/auto-form/fields/input';
import { AutoFormTextArea } from '@/components/ui/auto-form/fields/textarea';

export const ContentTestingActionEmailSettingsAdmin = () => {
  const t = useTranslations('admin.core.settings.email.test');
  const { onSubmit, formSchema } = useTestingEmailAdmin();

  return (
    <>
      <DialogHeader>
        <DialogTitle>{t('title')}</DialogTitle>
      </DialogHeader>

      <AutoForm
        formSchema={formSchema}
        onSubmit={onSubmit}
        submitButton={props => (
          <DialogFooter>
            <Button {...props}>{t('send_testing_email')}</Button>
          </DialogFooter>
        )}
        fieldConfig={{
          from: {
            label: t('from'),
            fieldType: props => <AutoFormInput type="email" {...props} />,
          },
          to: {
            label: t('to'),
            fieldType: props => <AutoFormInput type="email" {...props} />,
          },
          subject: {
            label: t('subject'),
            fieldType: AutoFormInput,
          },
          message: {
            label: t('message'),
            fieldType: AutoFormTextArea,
          },
        }}
      />
    </>
  );
};
