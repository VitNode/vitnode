import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { CheckIcon } from "@radix-ui/react-icons";

import { CommandGroup, CommandItem } from "@/components/ui/command";
import { Loader } from "@/components/loader";
import { usePathname, useRouter } from "@/utils/i18n";
import { cn } from "@/functions/classnames";
import { ContentFilterToolbarDataTableProps } from "./content";
import { useFilterToolbarDataTable } from "../hooks/use-filter-toolbar-data-table";

export const ListContentFilterToolbarDataTable = ({
  isFetching,
  options
}: Pick<ContentFilterToolbarDataTableProps, "isFetching" | "options">) => {
  const t = useTranslations("core");
  const { id } = useFilterToolbarDataTable();
  const { push } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedValues = searchParams.getAll(id);

  if (isFetching) return <Loader />;
  if (options.length === 0)
    return <div className="py-6 text-center text-sm">{t("no_results")}</div>;

  return (
    <CommandGroup>
      {options.map(option => {
        const isSelected =
          selectedValues.findIndex(v => v === option.value) !== -1;

        return (
          <CommandItem
            key={option.value}
            onSelect={() => {
              const params = new URLSearchParams(searchParams);
              if (isSelected) {
                params.delete(id, option.value);
              } else {
                params.append(id, option.value);
              }

              const query = params.toString();

              push(query ? `${pathname}?${params.toString()}` : pathname);
            }}
          >
            <div
              className={cn(
                "border-primary mr-2 flex h-4 w-4 items-center justify-center rounded-sm border",
                isSelected
                  ? "bg-primary text-primary-foreground"
                  : "opacity-50 [&_svg]:invisible"
              )}
            >
              <CheckIcon className={cn("h-4 w-4")} />
            </div>
            {option.icon && (
              <option.icon className="text-muted-foreground mr-2 size-4" />
            )}
            <span>{option.label}</span>
          </CommandItem>
        );
      })}
    </CommandGroup>
  );
};
