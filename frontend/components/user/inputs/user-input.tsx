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

const UserInputContent = lazy(() =>
  import("./content/content").then(module => ({
    default: module.UserInputContent
  }))
);

export interface UserInputItem {
  id: number;
  name: string;
}

interface Props {
  onChange: (value?: UserInputItem | UserInputItem[]) => void;
  className?: string;
}

interface MultiProps extends Props {
  className?: string;
  multiple?: true;
  value?: UserInputItem[];
}

interface SingleProps extends Props {
  className?: string;
  multiple?: never;
  value?: UserInputItem;
}

export const UserInput = forwardRef<
  HTMLButtonElement,
  SingleProps | MultiProps
>(({ className, multiple, onChange, value: currentValue, ...rest }, ref) => {
  const t = useTranslations("core.user_input");
  const values = Array.isArray(currentValue)
    ? currentValue
    : currentValue
      ? [currentValue]
      : [];
  const [open, setOpen] = useState(false);

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
                    className="[&>svg]:size-4 flex-shrink-0"
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
                    {item.name} <X />
                  </Badge>
                );
              })}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="p-0 w-64" align="start">
        <Suspense fallback={<Loader className="p-4" />}>
          <UserInputContent
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
        </Suspense>
      </PopoverContent>
    </Popover>
  );
});

UserInput.displayName = "UserInput";
