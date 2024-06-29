'use client';

import { useTranslations } from 'next-intl';
import { ConfigType } from 'vitnode-shared';

import { useEditorAdmin } from './hooks/use-editor-admin';
import { FilesSectionContentEditorAdmin } from './sections/files';

import { Card } from '../../../../../../components/ui/card';
import {
  Form,
  FormField,
  FormFieldRender,
  FormWrapper,
} from '../../../../../../components/ui/form';
import { Switch } from '../../../../../../components/ui/switch';
import { Button } from '../../../../../../components/ui/button';

export const ContentEditorAdmin = (data: ConfigType) => {
  const t = useTranslations('admin.core.styles.editor');
  const tCore = useTranslations('core');
  const { form, onSubmit } = useEditorAdmin(data);

  return (
    <Card className="p-6">
      <Form {...form}>
        <FormWrapper onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="sticky"
            render={({ field }) => (
              <FormFieldRender
                label={t('sticky.label')}
                description={t('sticky.desc')}
              >
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormFieldRender>
            )}
          />

          <FilesSectionContentEditorAdmin />

          <Button type="submit" loading={form.formState.isSubmitting}>
            {tCore('save')}
          </Button>
        </FormWrapper>
      </Form>
    </Card>
  );
};
