import { useTranslations } from "next-intl";
import { DialogTitle } from "@radix-ui/react-dialog";
import * as React from "react";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "vitnode-frontend/components/ui/dialog";
import { Button } from "vitnode-frontend/components/ui/button";
import { Form } from "vitnode-frontend/components/ui/form";
import { Tabs, TabsTrigger } from "vitnode-frontend/components/ui/tabs";

import { useCreateEditCategoryBlogAdmin } from "./hooks/use-create-edit-category-blog-admin";
import { ShowBlogCategories } from "@/graphql/hooks";
import { useTextLang } from "@/plugins/core/hooks/use-text-lang";
import { MainTabCreateEditCategoryBlogAdmin } from "./tabs/main";
import { PermissionsTabCreateEditCategoryBlogAdmin } from "./tabs/permissions";

interface Props {
  data?: ShowBlogCategories;
}

enum TabsEnum {
  MAIN = "main",
  PERMISSIONS = "permissions",
}

export const CreateEditCategoryBlogAdmin = ({ data }: Props) => {
  const t = useTranslations("blog.admin.categories");
  const { convertText } = useTextLang();
  const { form, onSubmit } = useCreateEditCategoryBlogAdmin({ data });
  const [activeTab, setActiveTab] = React.useState<TabsEnum>(TabsEnum.MAIN);

  const tabsContent = {
    [TabsEnum.MAIN]: <MainTabCreateEditCategoryBlogAdmin />,
    [TabsEnum.PERMISSIONS]: <PermissionsTabCreateEditCategoryBlogAdmin />,
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>{t(data ? "edit.title" : "create.title")}</DialogTitle>
        {data?.name && (
          <DialogDescription>{convertText(data.name)}</DialogDescription>
        )}
      </DialogHeader>

      <Tabs>
        <TabsTrigger
          id="main"
          active={activeTab === TabsEnum.MAIN}
          onClick={() => setActiveTab(TabsEnum.MAIN)}
        >
          {t("create.tabs.main")}
        </TabsTrigger>
        <TabsTrigger
          id="permissions"
          active={activeTab === TabsEnum.PERMISSIONS}
          onClick={() => setActiveTab(TabsEnum.PERMISSIONS)}
        >
          {t("create.tabs.permissions")}
        </TabsTrigger>
      </Tabs>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          {tabsContent[activeTab]}

          <DialogFooter>
            <Button
              type="submit"
              onClick={form.handleSubmit(onSubmit)}
              loading={form.formState.isSubmitting}
              disabled={!form.formState.isValid}
            >
              {t(data ? "edit.submit" : "create.submit")}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
};
