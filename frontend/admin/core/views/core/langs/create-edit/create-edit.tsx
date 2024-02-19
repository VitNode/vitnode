import { useTranslations } from "next-intl";
import { Virtuoso } from "react-virtuoso";

import { useCreateEditLangAdmin } from "./hooks/use-create-edit-lang-admin";
import type { ShowCoreLanguages } from "@/graphql/hooks";
import {
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger
} from "@/components/ui/select";
import { timeZones } from "./timezones";
import { cn } from "@/functions/classnames";

interface Props {
  data?: ShowCoreLanguages;
}

export const CreateEditLangAdmin = ({ data }: Props) => {
  const t = useTranslations("admin.core.langs.actions");
  const { form, onSubmit } = useCreateEditLangAdmin({ data });

  return (
    <>
      <DialogHeader>
        <DialogTitle>{data ? data.name : "test"}</DialogTitle>
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

          {!data && (
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
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="timezone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("create.timezone.label")}</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger
                      className={cn({
                        "text-muted-foreground": !field.value
                      })}
                    >
                      {field.value || t("create.timezone.placeholder")}
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    <Virtuoso
                      style={{ height: "200px" }}
                      data={timeZones}
                      itemContent={(index, zone) => (
                        <SelectItem value={zone}>{zone}</SelectItem>
                      )}
                    />
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>

        <DialogFooter>
          <Button
            type="submit"
            onClick={form.handleSubmit(onSubmit)}
            loading={form.formState.isSubmitting}
          >
            {t(data ? "edit.submit" : "create.submit")}
          </Button>
        </DialogFooter>
      </Form>
    </>
  );
};
