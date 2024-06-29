'use client';

import { useTranslations } from 'next-intl';

import { useSettingsCoreAdmin } from './hooks/use-settings-core-admin';

import { Core_Main_Settings__ShowQuery } from '../../../../../../graphql/graphql';
import {
  Form,
  FormField,
  FormFieldRender,
  FormWrapper,
} from '../../../../../../components/ui/form';
import { Input } from '../../../../../../components/ui/input';
import { TextLanguageInput } from '../../../../../../components/ui/text-language-input';
import { Button } from '../../../../../../components/ui/button';

export const ContentMainSettingsCoreAdmin = (
  props: Core_Main_Settings__ShowQuery,
) => {
  const t = useTranslations('admin.core.settings.main');
  const tCore = useTranslations('core');
  const { form, onSubmit } = useSettingsCoreAdmin(props);

  return (
    <Form {...form}>
      <FormWrapper onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormFieldRender label={t('name.label')}>
              <Input {...field} />
            </FormFieldRender>
          )}
        />

        <FormField
          control={form.control}
          name="short_name"
          render={({ field }) => (
            <FormFieldRender label={t('short_name.label')}>
              <Input {...field} />
            </FormFieldRender>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormFieldRender label={t('description.label')} optional>
              <TextLanguageInput {...field} />
            </FormFieldRender>
          )}
        />

        <FormField
          control={form.control}
          name="copyright"
          render={({ field }) => (
            <FormFieldRender label={t('copyright.label')}>
              <TextLanguageInput {...field} />
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
