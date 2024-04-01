import { Suspense, forwardRef, lazy, useState } from "react";
import { useTranslations } from "next-intl";
import { X } from "lucide-react";

import { cn } from "@/functions/classnames";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Loader } from "@/components/loader";
import { Badge } from "@/components/ui/badge";
import type { TextLanguage } from "@/graphql/hooks";
import { useTextLang } from "@/hooks/core/use-text-lang";

const Content = lazy(() =>
  import("./content").then((module) => ({
    default: module.ContentForumsSelect
  }))
);

export interface ForumSelectItem {
  id: number;
  name: TextLanguage[];
}

interface Props {
  onChange: (value?: ForumSelectItem | ForumSelectItem[]) => void;
  className?: string;
  exclude?: number[];
}

interface MultiProps extends Props {
  className?: string;
  multiple?: true;
  value?: ForumSelectItem[];
}

interface SingleProps extends Props {
  className?: string;
  multiple?: never;
  value?: ForumSelectItem;
}

export const ForumsSelect = forwardRef<
  HTMLButtonElement,
  SingleProps | MultiProps
>(
  (
    {
      className,
      exclude,
      multiple,
      onChange,
      value: currentValue = [],
      ...rest
    },
    ref
  ) => {
    const t = useTranslations("forum.select");
    const tCore = useTranslations("core");
    const values = Array.isArray(currentValue) ? currentValue : [currentValue];

    const [open, setOpen] = useState(false);
    const { convertText } = useTextLang();

    const placeholder = () => {
      if (values.length > 1) {
        return (
          <Badge
            className="[&>svg]:size-4 flex-shrink-0"
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onChange([]);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.stopPropagation();
                e.preventDefault();
                onChange([]);
              }
            }}
          >
            {tCore("checked_number", { count: values.length })} <X />
          </Badge>
        );
      }

      return values.map((item) => {
        return (
          <Badge
            className="[&>svg]:size-4 flex-shrink-0"
            key={item.id}
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onChange();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.stopPropagation();
                e.preventDefault();
                onChange();
              }
            }}
          >
            {convertText(item.name)} <X />
          </Badge>
        );
      });
    };

    return (
      <Popover open={open} onOpenChange={setOpen} modal>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn("w-full justify-start", className, {
              "text-muted-foreground": values.length === 0
            })}
            ref={ref}
            {...rest}
          >
            {values.length === 0 ? t("placeholder") : placeholder()}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="p-0 w-64" align="start">
          <Suspense fallback={<Loader className="p-2" />}>
            <Content
              values={values}
              exclude={exclude}
              onSelect={(item) => {
                if (multiple) {
                  if (values.find((value) => value.id === item.id)) {
                    onChange(values.filter((value) => value.id !== item.id));

                    return;
                  }
                  onChange([...values, item]);

                  return;
                }

                onChange(item.id !== values[0]?.id ? item : undefined);
                setOpen(false);
              }}
            />
          </Suspense>
        </PopoverContent>
      </Popover>
    );
  }
);

ForumsSelect.displayName = "ForumsSelect";
