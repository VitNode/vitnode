import { Suspense, lazy, useState } from 'react';
import { useTranslations } from 'next-intl';

import { Tabs } from '@/components/tabs/tabs';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { Loader } from '@/components/loader/loader';
import { Button } from '@/components/ui/button';
import {
  CreateEditFormGroupsMembersAdminArgs,
  useCreateEditFormGroupsMembersAdmin
} from './hooks/use-create-edit-form-groups-members-admin';

const MainContentCreateEditFormGroupsMembersAdmin = lazy(() =>
  import('./content/main-content-create-edit-form-groups-members-admin').then(module => ({
    default: module.MainContentCreateEditFormGroupsMembersAdmin
  }))
);
const ContentContentCreateEditFormGroupsMembersAdmin = lazy(() =>
  import('./content/content-content-create-edit-form-groups-members-admin').then(module => ({
    default: module.ContentContentCreateEditFormGroupsMembersAdmin
  }))
);

enum TabsEnum {
  MAIN = 'main',
  CONTENT = 'content'
}

interface Props extends CreateEditFormGroupsMembersAdminArgs {
  title: string;
}

export const CreateEditFormGroupsMembersAdmin = ({ data, title }: Props) => {
  const t = useTranslations('core');
  const [activeTab, setActiveTab] = useState<TabsEnum>(TabsEnum.MAIN);
  const { form, isPending, onSubmit } = useCreateEditFormGroupsMembersAdmin({ data });

  const tabsContent = {
    [TabsEnum.MAIN]: <MainContentCreateEditFormGroupsMembersAdmin />,
    [TabsEnum.CONTENT]: <ContentContentCreateEditFormGroupsMembersAdmin />
  };

  return (
    <>
      <DialogHeader className="flex flex-col gap-4">
        <DialogTitle>{title}</DialogTitle>

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
          <Suspense fallback={<Loader />}>{tabsContent[activeTab]}</Suspense>

          <Button disabled={!form.formState.isValid} loading={isPending} type="submit">
            {t('save')}
          </Button>
        </form>
      </Form>
    </>
  );
};
