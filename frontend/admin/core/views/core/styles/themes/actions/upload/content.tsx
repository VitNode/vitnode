import { useTranslations } from "next-intl";

import { Form, FormField } from "@/components/ui/form";
import { useThemeUpload } from "./hooks/use-upload-theme";
import { FilesInput } from "@/components/ui/files/files-input";
import {
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const ContentUploadActionThemeAdmin = () => {
  const t = useTranslations("admin.core.styles.themes.upload");
  const { form, onSubmit } = useThemeUpload();

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
                id="theme"
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
