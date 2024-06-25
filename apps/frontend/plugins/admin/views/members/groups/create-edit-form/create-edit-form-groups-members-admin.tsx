import * as React from "react";
import { useTranslations } from "next-intl";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "vitnode-frontend/components/ui/dialog";
import { Button } from "vitnode-frontend/components/ui/button";
import { Form } from "vitnode-frontend/components/ui/form";
import { Tabs, TabsTrigger } from "vitnode-frontend/components/ui/tabs";

import {
  useCreateEditFormGroupsMembersAdmin,
  CreateEditFormGroupsMembersAdminArgs,
} from "./hooks/use-create-edit-form-groups-members-admin";
import { useTextLang } from "@/plugins/core/hooks/use-text-lang";
import { MainContentCreateEditFormGroupsMembersAdmin } from "./content/main";
import { ContentContentCreateEditFormGroupsMembersAdmin } from "./content/content";

enum TabsEnum {
  MAIN = "main",
  CONTENT = "content",
}

export const CreateEditFormGroupsMembersAdmin = ({
  data,
}: CreateEditFormGroupsMembersAdminArgs) => {
  const t = useTranslations("admin.members.groups");
  const tCore = useTranslations("core");
  const [activeTab, setActiveTab] = React.useState<TabsEnum>(TabsEnum.MAIN);
  const { form, onSubmit } = useCreateEditFormGroupsMembersAdmin({ data });
  const { convertText } = useTextLang();

  const tabsContent = {
    [TabsEnum.MAIN]: <MainContentCreateEditFormGroupsMembersAdmin />,
    [TabsEnum.CONTENT]: (
      <ContentContentCreateEditFormGroupsMembersAdmin
        isGuest={data?.id === 1}
      />
    ),
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
            {t("create_edit.main")}
          </TabsTrigger>
          <TabsTrigger
            id="content"
            active={activeTab === TabsEnum.CONTENT}
            onClick={() => setActiveTab(TabsEnum.CONTENT)}
          >
            {t("create_edit.content")}
          </TabsTrigger>
        </Tabs>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {tabsContent[activeTab]}

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
