import { useTranslations } from 'next-intl';
import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from 'vitnode-frontend/components/ui/dialog';
import { Button } from 'vitnode-frontend/components/ui/button';
import {
  Form,
  FormWrapper,
  FormField,
  FormFieldRender,
} from 'vitnode-frontend/components/ui/form';
import { Input } from 'vitnode-frontend/components/ui/input';
import { Textarea } from 'vitnode-frontend/components/ui/textarea';

import { useTestingEmailAdmin } from './hooks/use-testing-email-admin';

export const ContentTestingActionEmailSettingsAdmin = () => {
  const t = useTranslations('admin.core.settings.email.test');
  const { form, onSubmit } = useTestingEmailAdmin();

  return (
    <>
      <DialogHeader>
        <DialogTitle>{t('title')}</DialogTitle>
      </DialogHeader>

      <Form {...form}>
        <FormWrapper onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="from"
            render={({ field }) => (
              <FormFieldRender label={t('from')}>
                <Input {...field} type="email" />
              </FormFieldRender>
            )}
          />

          <FormField
            control={form.control}
            name="to"
            render={({ field }) => (
              <FormFieldRender label={t('to')}>
                <Input {...field} type="email" />
              </FormFieldRender>
            )}
          />

          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormFieldRender label={t('subject')}>
                <Input {...field} />
              </FormFieldRender>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormFieldRender label={t('message')}>
                <Textarea {...field} />
              </FormFieldRender>
            )}
          />

          <DialogFooter>
            <Button
              type="submit"
              disabled={!form.formState.isValid}
              loading={form.formState.isSubmitting}
            >
              {t('send_testing_email')}
            </Button>
          </DialogFooter>
        </FormWrapper>
      </Form>
    </>
  );
};
