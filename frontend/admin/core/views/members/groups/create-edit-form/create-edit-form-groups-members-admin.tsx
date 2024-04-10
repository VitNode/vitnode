import { Suspense, lazy, useState } from "react";
import { useTranslations } from "next-intl";

import { Tabs } from "@/components/tabs/tabs";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import {
  useCreateEditFormGroupsMembersAdmin,
  type CreateEditFormGroupsMembersAdminArgs
} from "./hooks/use-create-edit-form-groups-members-admin";
import { useTextLang } from "@/hooks/core/use-text-lang";
import { TabsTrigger } from "@/components/tabs/tabs-trigger";

const MainContentCreateEditFormGroupsMembersAdmin = lazy(() =>
  import("./content/main-content-create-edit-form-groups-members-admin").then(
    module => ({
      default: module.MainContentCreateEditFormGroupsMembersAdmin
    })
  )
);
const ContentContentCreateEditFormGroupsMembersAdmin = lazy(() =>
  import(
    "./content/content-content-create-edit-form-groups-members-admin"
  ).then(module => ({
    default: module.ContentContentCreateEditFormGroupsMembersAdmin
  }))
);

enum TabsEnum {
  MAIN = "main",
  CONTENT = "content"
}

export const CreateEditFormGroupsMembersAdmin = ({
  data
}: CreateEditFormGroupsMembersAdminArgs) => {
  const t = useTranslations("admin.members.groups");
  const tCore = useTranslations("core");
  const [activeTab, setActiveTab] = useState<TabsEnum>(TabsEnum.MAIN);
  const { form, onSubmit } = useCreateEditFormGroupsMembersAdmin({ data });
  const { convertText } = useTextLang();

  const tabsContent = {
    [TabsEnum.MAIN]: <MainContentCreateEditFormGroupsMembersAdmin />,
    [TabsEnum.CONTENT]: <ContentContentCreateEditFormGroupsMembersAdmin />
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>{data ? t("edit.title") : t("create.title")}</DialogTitle>
        {data && (
          <DialogDescription>{convertText(data.name)}</DialogDescription>
        )}

        <Tabs>
          <TabsTrigger
            id="main"
            active={activeTab === TabsEnum.MAIN}
            onClick={() => setActiveTab(TabsEnum.MAIN)}
          >
            Main
          </TabsTrigger>
          <TabsTrigger
            id="content"
            active={activeTab === TabsEnum.CONTENT}
            onClick={() => setActiveTab(TabsEnum.CONTENT)}
          >
            Content
          </TabsTrigger>
        </Tabs>
      </DialogHeader>

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
