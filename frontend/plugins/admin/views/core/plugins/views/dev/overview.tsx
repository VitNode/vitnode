"use client";

import { useTranslations } from "next-intl";

import { ShowAdminPlugins } from "@/utils/graphql/hooks";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { useCreateEditPluginAdmin } from "../../actions/create/hooks/use-create-edit-plugin-admin";
import { FormCreateEditPluginAdmin } from "../../actions/create/form";

interface Props {
  data: ShowAdminPlugins;
}

export const OverviewDevPluginAdminView = ({ data }: Props) => {
  const t = useTranslations("core");
  const { form, onSubmit } = useCreateEditPluginAdmin({ data });

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-[40rem] space-y-4"
        >
          <FormCreateEditPluginAdmin form={form} isEdit />

          <Button
            disabled={!form.formState.isValid}
            loading={form.formState.isSubmitting}
            type="submit"
          >
            {t("edit")}
          </Button>
        </form>
      </Form>
    </div>
  );
};
