import * as React from "react";
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
import { TextLanguage } from "@/utils/graphql/hooks";
import { useTextLang } from "@/plugins/core/hooks/use-text-lang";

const Content = React.lazy(async () =>
  import("./content").then(module => ({
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

export const ForumsSelect = ({
  className,
  exclude,
  multiple,
  onChange,
  value: currentValue = [],
  ...rest
}: MultiProps | SingleProps) => {
  const t = useTranslations("forum.select");
  const tCore = useTranslations("core");
  const values = Array.isArray(currentValue) ? currentValue : [currentValue];

  const [open, setOpen] = React.useState(false);
  const { convertText } = useTextLang();

  const placeholder = () => {
    if (values.length > 1) {
      return (
        <Badge
          className="shrink-0 [&>svg]:size-4"
          tabIndex={0}
          onClick={e => {
            e.stopPropagation();
            e.preventDefault();
            onChange([]);
          }}
          onKeyDown={e => {
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

    return values.map(item => {
      return (
        <Badge
          className="shrink-0 [&>svg]:size-4"
          key={item.id}
          tabIndex={0}
          onClick={e => {
            e.stopPropagation();
            e.preventDefault();
            onChange();
          }}
          onKeyDown={e => {
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
          {...rest}
        >
          {values.length === 0 ? t("placeholder") : placeholder()}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-64 p-0" align="start">
        <React.Suspense fallback={<Loader className="p-2" />}>
          <Content
            values={values}
            exclude={exclude}
            onSelect={item => {
              if (multiple) {
                if (values.find(value => value.id === item.id)) {
                  onChange(values.filter(value => value.id !== item.id));

                  return;
                }
                onChange([...values, item]);

                return;
              }

              onChange(item.id !== values[0]?.id ? item : undefined);
              setOpen(false);
            }}
          />
        </React.Suspense>
      </PopoverContent>
    </Popover>
  );
};
