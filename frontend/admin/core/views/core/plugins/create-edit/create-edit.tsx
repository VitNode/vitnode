import { useTranslations } from "next-intl";

import {
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { useCreateEditPluginAdmin } from "./hooks/use-create-edit-plugin-admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ShowAdminPlugins } from "@/graphql/hooks";

interface Props {
  data?: ShowAdminPlugins;
}

export const CreateEditPluginAdmin = ({ data }: Props) => {
  const t = useTranslations("admin.core.plugins");
  const tCore = useTranslations("core");
  const { form, onSubmit } = useCreateEditPluginAdmin({ data });

  return (
    <>
      <DialogHeader>
        <DialogTitle>{t(data ? "edit.title" : "create.title")}</DialogTitle>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("create.name.label")}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>{t("create.name.desc")}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel optional>{t("create.description.label")}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("create.code.label")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder="vitnode-plugin-example"
                    disabled={!!data}
                    {...field}
                  />
                </FormControl>
                <FormDescription>{t("create.code.desc")}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="support_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("create.support_url.label")}</FormLabel>
                <FormControl>
                  <Input type="url" {...field} />
                </FormControl>
                <FormDescription>
                  {t("create.support_url.desc")}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("create.author.label")}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="author_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel optional>{t("create.author_url.label")}</FormLabel>
                <FormControl>
                  <Input type="url" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter>
            <Button
              disabled={!form.formState.isValid}
              loading={form.formState.isSubmitting}
              type="submit"
            >
              {tCore(data ? "edit" : "create")}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
};
