import { useTranslations } from "next-intl";
import * as React from "react";
import { X } from "lucide-react";
import { cn } from "vitnode-frontend/helpers";

import { GroupInputContent } from "./content/content";

import { TextLanguage } from "../../../graphql/hooks";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Loader } from "../../loader";
import { useTextLang } from "../../../plugins/core/hooks/use-text-lang";

export interface GroupInputItem {
  id: number;
  name: TextLanguage[];
}

interface Props {
  onChange: (value?: GroupInputItem | GroupInputItem[]) => void;
  className?: string;
  disabled?: boolean;
  onBlur?: () => void;
}

interface MultiProps extends Props {
  className?: string;
  multiple?: true;
  value?: GroupInputItem[];
}

interface SingleProps extends Props {
  className?: string;
  multiple?: never;
  value?: GroupInputItem;
}

export const GroupInput = ({
  className,
  multiple,
  onChange,
  value: currentValue,
  ...rest
}: MultiProps | SingleProps) => {
  const t = useTranslations("core.group_input");
  const values = Array.isArray(currentValue)
    ? currentValue
    : currentValue
      ? [currentValue]
      : [];
  const [open, setOpen] = React.useState(false);
  const { convertText } = useTextLang();

  return (
    <Popover open={open} onOpenChange={setOpen} modal>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn("w-full justify-start", className, {
            "text-muted-foreground": values.length === 0,
          })}
          {...rest}
        >
          {values.length === 0
            ? t("placeholder")
            : values.map(item => {
                const onRemove = () => {
                  if (multiple) {
                    onChange(values.filter(value => value.id !== item.id));

                    return;
                  }

                  onChange();
                };

                return (
                  <Badge
                    className="shrink-0 [&>svg]:size-4"
                    key={item.id}
                    tabIndex={0}
                    onClick={e => {
                      e.stopPropagation();
                      e.preventDefault();
                      onRemove();
                    }}
                    onKeyDown={e => {
                      if (e.key === "Enter") {
                        e.stopPropagation();
                        e.preventDefault();
                        onRemove();
                      }
                    }}
                  >
                    {convertText(item.name)} <X />
                  </Badge>
                );
              })}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-64 p-0" align="start">
        <React.Suspense fallback={<Loader className="p-4" />}>
          <GroupInputContent
            values={values}
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
