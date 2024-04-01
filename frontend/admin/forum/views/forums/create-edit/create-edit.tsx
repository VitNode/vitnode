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
import type { ShowForumForumsAdminWithChildren } from "../table/hooks/use-forum-forums-admin-api";
import { useTextLang } from "@/hooks/core/use-text-lang";

const MainContentCreateEditFormForumAdmin = lazy(() =>
  import("./content/main").then((module) => ({
    default: module.MainContentCreateEditFormForumAdmin
  }))
);
const PermissionsContentCreateEditFormForumAdmin = lazy(() =>
  import("./content/permissions/permissions").then((module) => ({
    default: module.PermissionsContentCreateEditFormForumAdmin
  }))
);

enum TabsEnum {
  MAIN = "main",
  PERMISSIONS = "permissions"
}

export interface CreateEditForumAdminProps {
  data?: Omit<ShowForumForumsAdminWithChildren, "children">;
}

export const CreateEditForumAdmin = ({ data }: CreateEditForumAdminProps) => {
  const t = useTranslations("admin_forum.forums.create_edit");
  const tCore = useTranslations("core");
  const { form, onSubmit } = useCreateEditFormForumAdmin({ data });
  const [activeTab, setActiveTab] = useState<TabsEnum>(TabsEnum.MAIN);
  const { convertText } = useTextLang();

  const tabsContent = {
    [TabsEnum.MAIN]: <MainContentCreateEditFormForumAdmin />,
    [TabsEnum.PERMISSIONS]: <PermissionsContentCreateEditFormForumAdmin />
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>
          {data
            ? t("edit_title", { name: convertText(data.name) })
            : t("create_title")}
        </DialogTitle>
      </DialogHeader>

      <Tabs>
        <TabsTrigger
          id="main"
          active={activeTab === TabsEnum.MAIN}
          onClick={() => setActiveTab(TabsEnum.MAIN)}
        >
          {t("tabs.main")}
        </TabsTrigger>
        <TabsTrigger
          id="permissions"
          active={activeTab === TabsEnum.PERMISSIONS}
          onClick={() => setActiveTab(TabsEnum.PERMISSIONS)}
        >
          {t("tabs.permissions")}
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
