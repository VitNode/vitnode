import { useTranslations } from "next-intl";

import { Form, FormField } from "@/components/ui/form";
import { useUploadThemeAdmin } from "./hooks/use-upload-theme-admin";
import { FilesInput } from "@/components/ui/files/files-input";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { ShowAdminThemes } from "@/graphql/hooks";

export interface UploadThemeAdminProps {
  data?: Pick<ShowAdminThemes, "id" | "name">;
}

export const UploadThemeAdmin = ({ data }: UploadThemeAdminProps) => {
  const t = useTranslations("admin.core.styles.themes.upload");
  const { form, onSubmit } = useUploadThemeAdmin({ data });

  return (
    <>
      <DialogHeader>
        <DialogTitle>{t("title")}</DialogTitle>
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
