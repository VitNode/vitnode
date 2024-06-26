import { useTranslations } from "next-intl";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "vitnode-frontend/components/ui/dialog";
import { Button } from "vitnode-frontend/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
  FormDescription,
} from "vitnode-frontend/components/ui/form";
import { Input } from "vitnode-frontend/components/ui/input";
import { Switch } from "vitnode-frontend/components/ui/switch";

import { TimezoneFieldCreateEditLangAdmin } from "./fields/timezone";
import { LocaleFieldCreateEditLangAdmin } from "./fields/locale";
import { ShowCoreLanguages } from "@/graphql/hooks";
import { useCreateEditLangAdmin } from "./hooks/use-create-edit-lang-admin";

interface Props {
  data?: ShowCoreLanguages;
}

export const CreateEditLangAdmin = ({ data }: Props) => {
  const t = useTranslations("admin.core.langs.actions");
  const { form, onSubmit } = useCreateEditLangAdmin({ data });

  return (
    <>
      <DialogHeader>
        <DialogTitle>{t(data ? "edit.title" : "create.title")}</DialogTitle>
        {data?.name && <DialogDescription>{data.name}</DialogDescription>}
      </DialogHeader>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("create.name.label")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("create.name.placeholder")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="timezone"
            render={({ field }) => (
              <TimezoneFieldCreateEditLangAdmin field={field} />
            )}
          />

          <FormField
            control={form.control}
            name="locale"
            render={({ field }) => (
              <LocaleFieldCreateEditLangAdmin field={field} />
            )}
          />

          {!data ? (
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("create.code.label")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("create.code.placeholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>{t("create.code.desc")}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            <FormField
              control={form.control}
              name="default"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between gap-2 rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      {t("edit.default.label")}
                    </FormLabel>
                    <FormDescription>{t("edit.default.desc")}</FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={data.default}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="time_24"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between gap-2 rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">
                    {t("create.time_24.label")}
                  </FormLabel>
                  <FormDescription>{t("create.time_24.desc")}</FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="allow_in_input"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between gap-2 rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">
                    {t("create.allow_in_input.label")}
                  </FormLabel>
                  <FormDescription>
                    {t("create.allow_in_input.desc")}
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

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
