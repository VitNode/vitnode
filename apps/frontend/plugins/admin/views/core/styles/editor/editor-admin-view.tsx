'use client';

import { useTranslations } from 'next-intl';
import {
  Form,
  FormField,
  FormFieldRender,
  FormWrapper,
} from 'vitnode-frontend/components/ui/form';
import { Button } from 'vitnode-frontend/components/ui/button';
import { Card } from 'vitnode-frontend/components/ui/card';
import { Switch } from 'vitnode-frontend/components/ui/switch';

import { useEditorAdmin, EditorAdminArgs } from './hooks/use-editor-admin';
import { FilesSectionContentEditorAdmin } from './sections/files';

export const EditorAdminView = ({ data }: EditorAdminArgs) => {
  const t = useTranslations('admin.core.styles.editor');
  const tCore = useTranslations('core');
  const { form, onSubmit } = useEditorAdmin({ data });

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
