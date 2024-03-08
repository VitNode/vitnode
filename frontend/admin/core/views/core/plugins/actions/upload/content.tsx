import { useTranslations } from "next-intl";

import {
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { useUploadPluginAdmin } from "./hooks/use-upload-plugin-admin";
import { Form, FormField } from "@/components/ui/form";
import { FilesInput } from "@/components/ui/files/files-input";
import { Button } from "@/components/ui/button";

export const ContentUploadActionsPluginsAdmin = () => {
  const t = useTranslations("admin.core.plugins.upload");
  const { form, onSubmit } = useUploadPluginAdmin();

  return (
    <>
      <DialogHeader>
        <DialogTitle>{t("title")}</DialogTitle>
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
