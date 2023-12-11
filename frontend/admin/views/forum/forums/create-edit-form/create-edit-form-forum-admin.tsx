import { useTranslations } from 'next-intl';
import { Suspense, lazy, useState } from 'react';

import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useCreateEditFormForumAdmin } from './hooks/use-create-edit-form-forum-admin';
import { Form } from '@/components/ui/form';
import { Tabs } from '@/components/tabs/tabs';
import { Loader } from '@/components/loader/loader';
import { Button } from '@/components/ui/button';

const MainContentCreateEditFormForumAdmin = lazy(() =>
  import('./content/main').then(module => ({
    default: module.MainContentCreateEditFormForumAdmin
  }))
);
const PermissionsContentCreateEditFormForumAdmin = lazy(() =>
  import('./content/permissions/permissions').then(module => ({
    default: module.PermissionsContentCreateEditFormForumAdmin
  }))
);

enum TabsEnum {
  MAIN = 'main',
  PERMISSIONS = 'permissions'
}

export const CreateEditFormForumAdmin = () => {
  const t = useTranslations('admin.forum.forums');
  const tCore = useTranslations('core');
  const { form, isPending, onSubmit } = useCreateEditFormForumAdmin();
  const [activeTab, setActiveTab] = useState<TabsEnum>(TabsEnum.MAIN);

  const tabsContent = {
    [TabsEnum.MAIN]: <MainContentCreateEditFormForumAdmin />,
    [TabsEnum.PERMISSIONS]: <PermissionsContentCreateEditFormForumAdmin />
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>{t('create.title')}</DialogTitle>
      </DialogHeader>

      <Tabs
        items={[
          {
            id: 'main',
            text: t('create_edit.tabs.main'),
            active: activeTab === TabsEnum.MAIN,
            onClick: () => setActiveTab(TabsEnum.MAIN)
          },
          {
            id: 'permissions',
            text: t('create_edit.tabs.permissions'),
            active: activeTab === TabsEnum.PERMISSIONS,
            onClick: () => setActiveTab(TabsEnum.PERMISSIONS)
          }
        ]}
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Suspense fallback={<Loader />}>{tabsContent[activeTab]}</Suspense>

          <Button disabled={!form.formState.isValid} loading={isPending} type="submit">
            {tCore('save')}
          </Button>
        </form>
      </Form>
    </>
  );
};
