import { AutoForm } from '@/components/form/auto-form';
import { AutoFormInput } from '@/components/form/fields/input';
import { AutoFormTextArea } from '@/components/form/fields/textarea';
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
