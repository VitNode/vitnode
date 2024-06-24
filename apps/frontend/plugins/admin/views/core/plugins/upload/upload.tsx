import { useTranslations } from "next-intl";
import {
  Button,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Form,
  FormField,
  FormItem,
  FormMessage,
  FilesInput,
} from "vitnode-frontend/components";

import { useUploadPluginAdmin } from "./hooks/use-upload-plugin-admin";
import { ShowAdminPlugins } from "@/graphql/hooks";

export interface UploadPluginAdminProps {
  data?: Pick<ShowAdminPlugins, "code" | "name">;
}

export const UploadPluginAdmin = ({ data }: UploadPluginAdminProps) => {
  const t = useTranslations("admin.core.plugins.upload");
  const { form, onSubmit } = useUploadPluginAdmin({ data });

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
              <FormItem>
                <FilesInput
                  id="plugin"
                  {...field}
                  acceptExtensions={["tgz"]}
                  maxFileSizeInMb={0}
                />

                <FormMessage />
              </FormItem>
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
