'use client';

import { useTranslations } from 'next-intl';

import { ShowAdminPlugins } from '@/graphql/graphql';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';

import { FormCreateEditPluginAdmin } from '../../../actions/create/form';
import { useCreateEditPluginAdmin } from '../../../actions/create/hooks/use-create-edit-plugin-admin';

export const ContentOverviewDevPluginAdmin = (data: ShowAdminPlugins) => {
  const t = useTranslations('core');
  const { form, onSubmit } = useCreateEditPluginAdmin({ data });

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-[40rem] space-y-4"
        >
          <FormCreateEditPluginAdmin form={form} isEdit />

          <Button
            disabled={!form.formState.isValid}
            loading={form.formState.isSubmitting}
            type="submit"
          >
            {t('edit')}
          </Button>
        </form>
      </Form>
    </div>
  );
};
