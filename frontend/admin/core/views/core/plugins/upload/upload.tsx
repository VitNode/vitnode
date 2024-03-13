import { useTranslations } from "next-intl";

import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { useUploadPluginAdmin } from "./hooks/use-upload-plugin-admin";
import { Form, FormField } from "@/components/ui/form";
import { FilesInput } from "@/components/ui/files/files-input";
import { Button } from "@/components/ui/button";
import type { ShowAdminPlugins } from "@/graphql/hooks";

interface Props {
  data?: Pick<ShowAdminPlugins, "code" | "name">;
}

export const UploadPluginAdmin = ({ data }: Props) => {
  const t = useTranslations("admin.core.plugins.upload");
  const { form, onSubmit } = useUploadPluginAdmin();

  return (
    <>
      <DialogHeader>
        <DialogTitle>{t(data ? "title_new_version" : "title")}</DialogTitle>
        {data?.name && <DialogDescription>{data.name}</DialogDescription>}
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FilesInput
                className="mt-5"
                id="plugin"
                {...field}
                acceptExtensions={["tgz"]}
                maxFileSizeInMb={0}
              />
            )}
          />

          <DialogFooter>
            <Button
              disabled={!form.watch("file").length}
              loading={form.formState.isSubmitting}
              type="submit"
            >
              {t("submit")}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
};
