import { useTranslations } from "next-intl";
import { Suspense, lazy, useState } from "react";

import {
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { useCreateEditFormForumAdmin } from "./hooks/use-create-edit-form-forum-admin";
import { Form } from "@/components/ui/form";
import { Tabs } from "@/components/tabs/tabs";
import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import { TabsTrigger } from "@/components/tabs/tabs-trigger";

const MainContentCreateEditFormForumAdmin = lazy(() =>
  import("./content/main").then(module => ({
    default: module.MainContentCreateEditFormForumAdmin
  }))
);
const PermissionsContentCreateEditFormForumAdmin = lazy(() =>
  import("./content/permissions/permissions").then(module => ({
    default: module.PermissionsContentCreateEditFormForumAdmin
  }))
);

enum TabsEnum {
  MAIN = "main",
  PERMISSIONS = "permissions"
}

export const CreateEditForumAdmin = () => {
  const t = useTranslations("admin.forum.forums");
  const tCore = useTranslations("core");
  const { form, onSubmit } = useCreateEditFormForumAdmin();
  const [activeTab, setActiveTab] = useState<TabsEnum>(TabsEnum.MAIN);

  const tabsContent = {
    [TabsEnum.MAIN]: <MainContentCreateEditFormForumAdmin />,
    [TabsEnum.PERMISSIONS]: <PermissionsContentCreateEditFormForumAdmin />
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>{t("create.title")}</DialogTitle>
      </DialogHeader>

      <Tabs>
        <TabsTrigger
          id="main"
          active={activeTab === TabsEnum.MAIN}
          onClick={() => setActiveTab(TabsEnum.MAIN)}
        >
          {t("create_edit.tabs.main")}
        </TabsTrigger>
        <TabsTrigger
          id="permissions"
          active={activeTab === TabsEnum.PERMISSIONS}
          onClick={() => setActiveTab(TabsEnum.PERMISSIONS)}
        >
          {t("create_edit.tabs.permissions")}
        </TabsTrigger>
      </Tabs>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Suspense fallback={<Loader />}>{tabsContent[activeTab]}</Suspense>

          <DialogFooter>
            <Button
              disabled={!form.formState.isValid}
              loading={form.formState.isSubmitting}
              type="submit"
            >
              {tCore("save")}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
};
