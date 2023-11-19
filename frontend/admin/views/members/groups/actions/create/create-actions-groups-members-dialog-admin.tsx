import { useTranslations } from 'next-intl';
import { Suspense, lazy, useState } from 'react';

import { Tabs } from '@/components/tabs/tabs';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useFormCreateGroupAdmin } from './hooks/use-form-create-group-admin';
import { Form } from '@/components/ui/form';
import { Loader } from '@/components/loader/loader';
import { Button } from '@/components/ui/button';

const MainCreateActionsGroupsMembersAdmin = lazy(() =>
  import('./content/main-create-actions-groups-members-admin').then(module => ({
    default: module.MainCreateActionsGroupsMembersAdmin
  }))
);
const ContentCreateActionsGroupsMembersAdmin = lazy(() =>
  import('./content/content-create-actions-groups-members-admin').then(module => ({
    default: module.ContentCreateActionsGroupsMembersAdmin
  }))
);

enum TabsEnum {
  MAIN = 'main',
  CONTENT = 'content'
}

export const CreateActionsGroupsMembersDialogAdmin = () => {
  const t = useTranslations('admin.members.groups');
  const tCore = useTranslations('core');
  const [activeTab, setActiveTab] = useState<TabsEnum>(TabsEnum.MAIN);
  const { form, onSubmit } = useFormCreateGroupAdmin();

  return (
    <>
      <DialogHeader className="flex flex-col gap-4">
        <DialogTitle>{t('create.title')}</DialogTitle>

        <Tabs
          items={[
            {
              id: 'main',
              text: 'Main',
              active: activeTab === TabsEnum.MAIN,
              onClick: () => setActiveTab(TabsEnum.MAIN)
            },
            {
              id: 'content',
              text: 'Content',
              active: activeTab === TabsEnum.CONTENT,
              onClick: () => setActiveTab(TabsEnum.CONTENT)
            }
          ]}
        />
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Suspense fallback={<Loader />}>
            {activeTab === TabsEnum.MAIN && <MainCreateActionsGroupsMembersAdmin />}
            {activeTab === TabsEnum.CONTENT && <ContentCreateActionsGroupsMembersAdmin />}
          </Suspense>

          <Button disabled={!form.formState.isValid} type="submit">
            {tCore('save')}
          </Button>
        </form>
      </Form>
    </>
  );
};
