import { Plus, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Suspense, forwardRef, lazy, useState } from "react";

import { IconDynamic, type IconDynamicNames } from "@/components/icon-dynamic";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { cn } from "@/functions/classnames";
import { Loader } from "@/components/loader/loader";
import type { IconInputProps } from "./content/content";

const Content = lazy(() =>
  import("./content/content").then(module => ({
    default: module.ContentIconInput
  }))
);

interface Props extends Omit<IconInputProps, "setOpen"> {
  className?: string;
}

export const IconInput = forwardRef<HTMLButtonElement, Props>(
  ({ className, onChange, value }, ref) => {
    const t = useTranslations("core");
    const [open, setOpen] = useState(false);

    return (
      <Popover open={open} onOpenChange={setOpen} modal>
        <div className={cn("flex flex-col gap-2", className)}>
          <div className="flex gap-2">
            <PopoverTrigger asChild>
              <Button variant="outline" ref={ref}>
                <Plus /> {t("icon_picker.title")}
              </Button>
            </PopoverTrigger>

            {value && (
              <Button
                variant="destructiveGhost"
                onClick={() => {
                  onChange("");
                }}
              >
                <X /> {t("icon_picker.remove")}
              </Button>
            )}
          </div>

          {value && (
            <IconDynamic className="size-10" name={value as IconDynamicNames} />
          )}
        </div>

        <PopoverContent align="start" className="w-80">
          <Suspense fallback={<Loader />}>
            <Content onChange={onChange} value={value} setOpen={setOpen} />
          </Suspense>
        </PopoverContent>
      </Popover>
    );
  }
);

IconInput.displayName = "IconInput";
