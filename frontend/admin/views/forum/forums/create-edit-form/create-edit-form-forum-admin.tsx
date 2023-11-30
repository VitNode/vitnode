import { useTranslations } from 'next-intl';
import { Suspense, lazy, useState } from 'react';

import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useCreateEditFormForumAdmin } from './hooks/use-create-edit-form-forum-admin.ts';
import { Form } from '@/components/ui/form';
import { Tabs } from '@/components/tabs/tabs';
import { Loader } from '@/components/loader/loader';
import { Button } from '@/components/ui/button';

const MainContentCreateEditFormForumAdmin = lazy(() =>
  import('./content/main').then(module => ({
    default: module.MainContentCreateEditFormForumAdmin
  }))
);

enum TabsEnum {
  MAIN = 'main',
  CONTENT = 'content'
}

export const CreateEditFormForumAdmin = () => {
  const t = useTranslations('admin.forum.forums');
  const tCore = useTranslations('core');
  const { form, isPending, onSubmit } = useCreateEditFormForumAdmin();
  const [activeTab, setActiveTab] = useState<TabsEnum>(TabsEnum.MAIN);

  const tabsContent = {
    [TabsEnum.MAIN]: <MainContentCreateEditFormForumAdmin />,
    [TabsEnum.CONTENT]: <div>test</div>
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
