'use client';

import { useTranslations } from 'next-intl';
import { Suspense, lazy, useState } from 'react';

import { HeaderContent } from '@/components/header-content/header-content';
import { Tabs } from '@/components/tabs/tabs';
import { Button } from '@/components/ui/button';
import { useFormCreateGroupAdmin } from './hooks/use-form-create-group-admin';
import { Loader } from '@/components/loader/loader';
import { Form } from '@/components/ui/form';

const MainCreateGroupsMembersAdmin = lazy(() =>
  import('./content/main-create-groups-members-admin').then(module => ({
    default: module.MainCreateGroupsMembersAdmin
  }))
);
const ContentCreateGroupsMembersAdmin = lazy(() =>
  import('./content/content-create-groups-members-admin').then(module => ({
    default: module.ContentCreateGroupsMembersAdmin
  }))
);

enum TabsEnum {
  MAIN = 'main',
  CONTENT = 'content'
}

export const CreateGroupsMembersAdminView = () => {
  const t = useTranslations('admin.members.groups');
  const tCore = useTranslations('core');
  const [activeTab, setActiveTab] = useState<TabsEnum>(TabsEnum.MAIN);
  const { form, onSubmit } = useFormCreateGroupAdmin();

  return (
    <>
      <HeaderContent h1={t('create.title')} />

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
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-4 sm:max-w-2xl">
          <Suspense fallback={<Loader />}>
            {activeTab === TabsEnum.MAIN && <MainCreateGroupsMembersAdmin />}
            {activeTab === TabsEnum.CONTENT && <ContentCreateGroupsMembersAdmin />}
          </Suspense>

          <Button disabled={!form.formState.isValid} type="submit">
            {tCore('save')}
          </Button>
        </form>
      </Form>
    </>
  );
};
