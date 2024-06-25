import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { cn } from "vitnode-frontend/helpers";

import { useDownloadLangAdmin } from "./hooks/use-download-lang-admin";
import { ShowCoreLanguages } from "@/graphql/hooks";
import { useSessionAdmin } from "@/plugins/admin/hooks/use-session-admin";
import { Loader } from "vitnode-frontend/components/ui/loader";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "vitnode-frontend/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "vitnode-frontend/components/ui/form";
import { Switch } from "vitnode-frontend/components/ui/switch";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "vitnode-frontend/components/ui/popover";
import { Button } from "vitnode-frontend/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "vitnode-frontend/components/ui/command";

export const ContentDownloadActionsTableLangsCoreAdmin = ({
  code,
}: Pick<ShowCoreLanguages, "code">) => {
  const t = useTranslations("admin.core.langs.actions.download");
  const { form, onSubmit, query } = useDownloadLangAdmin({ code });
  const { version } = useSessionAdmin();
  const { data } = query;

  if (query.isLoading || !data) {
    return <Loader />;
  }

  const {
    admin__core_plugins__show: { edges },
  } = data;

  const plugins = [
    { id: "core", name: "Core", version, code: "core" },
    {
      id: "admin",
      name: "Admin",
      version,
      code: "admin",
    },
    ...edges,
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
              <FormItem className="flex flex-row items-center justify-between gap-2 rounded-lg border p-4">
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
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {t("selected", { count: field.value.length })}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 p-0">
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
                                      : [...values, item.code],
                                  );
                                }}
                              >
                                <Check
                                  className={cn(
                                    "size-4",
                                    field.value.includes(item.code)
                                      ? "opacity-100"
                                      : "opacity-0",
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
