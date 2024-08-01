'use client';

import { useTranslations } from 'next-intl';

import { useEmailSettingsFormAdmin } from './hooks/use-email-settings-form-admin';
import { Admin__Core_Email_Settings__ShowQuery } from '@/graphql/graphql';
import {
  Form,
  FormField,
  FormFieldRender,
  FormWrapper,
} from '@/components/ui/form';
import { ColorPicker } from '@/components/ui/color-picker';
import { HeaderContent } from '@/components/ui/header-content';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';

export const ContentEmailSettingsAdmin = (
  props: Admin__Core_Email_Settings__ShowQuery,
) => {
  const t = useTranslations('admin.core.settings.email');
  const tCore = useTranslations('core');
  const { form, onSubmit } = useEmailSettingsFormAdmin(props);

  return (
    <Form {...form}>
      <FormWrapper onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="color_primary"
          render={({ field }) => (
            <FormFieldRender label={t('color_primary')}>
              <ColorPicker {...field} disableRemoveColor />
            </FormFieldRender>
          )}
        />

        <div className="w-full space-y-2">
          <HeaderContent h2={t('smtp')} className="m-0" />
          <Separator />
        </div>

        <FormField
          control={form.control}
          name="smtp_host"
          render={({ field }) => (
            <FormFieldRender label={t('smtp_host')}>
              <Input {...field} placeholder="smtp.gmail.com" />
            </FormFieldRender>
          )}
        />

        <FormField
          control={form.control}
          name="smtp_user"
          render={({ field }) => (
            <FormFieldRender label={t('smtp_user')}>
              <Input {...field} placeholder="user" />
            </FormFieldRender>
          )}
        />

        <FormField
          control={form.control}
          name="smtp_password"
          render={({ field }) => (
            <FormFieldRender label={t('smtp_password')}>
              <Input {...field} type="password" placeholder="**********" />
            </FormFieldRender>
          )}
        />

        <FormField
          control={form.control}
          name="smtp_secure"
          render={({ field }) => (
            <FormFieldRender label={t('smtp_secure')}>
              <Switch
                checked={field.value}
                onCheckedChange={val => {
                  field.onChange(val);
                  if (val) {
                    form.setValue('smtp_port', 465);
                  }
                }}
              />
            </FormFieldRender>
          )}
        />

        <FormField
          control={form.control}
          name="smtp_port"
          render={({ field }) => (
            <FormFieldRender label={t('smtp_port')}>
              <Input {...field} type="number" min={1} max={999} />
            </FormFieldRender>
          )}
        />

        <Button
          type="submit"
          disabled={!form.formState.isValid}
          loading={form.formState.isSubmitting}
        >
          {tCore('save')}
        </Button>
      </FormWrapper>
    </Form>
  );
};
