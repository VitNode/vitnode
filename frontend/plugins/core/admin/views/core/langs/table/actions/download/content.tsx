import { useTranslations } from "next-intl";
import { Check } from "lucide-react";

import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { useDownloadLangAdmin } from "./hooks/use-download-lang-admin";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { cn } from "@/functions/classnames";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import { Loader } from "@/components/loader";
import { ShowCoreLanguages } from "@/utils/graphql/hooks";
import { useSessionAdmin } from "@/plugins/core/admin/hooks/use-session-admin";

export const ContentDownloadActionsTableLangsCoreAdmin = ({
  code
}: Pick<ShowCoreLanguages, "code">) => {
  const t = useTranslations("admin.core.langs.actions.download");
  const { form, onSubmit, query } = useDownloadLangAdmin({ code });
  const { version } = useSessionAdmin();
  const { data } = query;

  if (query.isLoading || !data) {
    return <Loader />;
  }

  const {
    admin__core_plugins__show: { edges }
  } = data;

  const plugins = [
    { id: "core", name: "Core", version, code: "core" },
    {
      id: "admin",
      name: "Admin",
      version,
      code: "admin"
    },
    ...edges
  ];

  return (
    <>
      <DialogHeader>
        <DialogTitle>{t("title", { code })}</DialogTitle>
        <DialogDescription>{t("desc")}</DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="all"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 gap-2">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">{t("all.label")}</FormLabel>
                  <FormDescription>{t("all.desc")}</FormDescription>
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

          {!form.watch("all") && (
            <FormField
              control={form.control}
              name="plugins"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">{t("plugins")}</FormLabel>

                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {t("selected", { count: field.value.length })}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="p-0 w-80">
                      <Command>
                        <CommandInput placeholder={t("search")} />

                        <CommandList>
                          <CommandEmpty>{t("empty")}</CommandEmpty>
                          <CommandGroup>
                            {plugins.map(item => (
                              <CommandItem
                                value={item.code}
                                key={item.id}
                                className="flex gap-2"
                                onSelect={value => {
                                  const values = field.value;

                                  field.onChange(
                                    values.includes(value)
                                      ? values.filter(el => el !== value)
                                      : [...values, item.code]
                                  );
                                }}
                              >
                                <Check
                                  className={cn(
                                    "size-4",
                                    field.value.includes(item.code)
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                <span className="font-semibold">
                                  {item.name}
                                </span>
                                <span>{item.version}</span>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <DialogFooter>
            <Button
              type="submit"
              onClick={form.handleSubmit(onSubmit)}
              loading={form.formState.isSubmitting}
              disabled={
                !form.watch("all") && form.watch("plugins").length === 0
              }
            >
              {t("submit")}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
};
