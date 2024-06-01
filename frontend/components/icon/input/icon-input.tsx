"use client";

import { Plus, X } from "lucide-react";
import { useTranslations } from "next-intl";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { cn } from "@/functions/classnames";
import { Loader } from "@/components/loader";
import { IconInputProps } from "./content/content";
import { IconLucideDynamic } from "./content/icons/icons";
import { IconLucideNames } from "../icon";

const Content = React.lazy(async () =>
  import("./content/content").then(module => ({
    default: module.ContentIconInput
  }))
);

interface Props extends Omit<IconInputProps, "setOpen"> {
  className?: string;
}

export const IconInput = ({ className, onChange, value }: Props) => {
  const t = useTranslations("core");
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen} modal>
      <div className={cn("flex flex-col gap-2", className)}>
        <div className="flex gap-2">
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full max-w-52 justify-start">
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
          <IconLucideDynamic
            className="size-10 text-4xl"
            name={value as IconLucideNames}
          />
        )}
      </div>

      <PopoverContent align="start" className="w-72 p-0">
        <React.Suspense fallback={<Loader className="p-4" />}>
          <Content onChange={onChange} value={value} setOpen={setOpen} />
        </React.Suspense>
      </PopoverContent>
    </Popover>
  );
};
