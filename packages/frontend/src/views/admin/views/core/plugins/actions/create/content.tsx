import { useTranslations } from 'next-intl';

import { useCreateEditPluginAdmin } from './hooks/use-create-edit-plugin-admin';
import { FormCreateEditPluginAdmin } from './form';
import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';

export const CreatePluginAdmin = () => {
  const t = useTranslations('admin.core.plugins');
  const tCore = useTranslations('core');
  const { form, onSubmit } = useCreateEditPluginAdmin({});

  return (
    <>
      <DialogHeader>
        <DialogTitle>{t('create.title')}</DialogTitle>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormCreateEditPluginAdmin form={form} />

          <DialogFooter>
            <Button
              disabled={!form.formState.isValid}
              loading={form.formState.isSubmitting}
              type="submit"
            >
              {tCore('create')}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
};
