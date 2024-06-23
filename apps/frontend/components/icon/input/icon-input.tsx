"use client";

import { Plus, X } from "lucide-react";
import { useTranslations } from "next-intl";
import * as React from "react";
import { cn } from "vitnode-frontend/helpers";
import { Button } from "vitnode-frontend/components";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Loader } from "@/components/loader";
import { IconInputProps } from "./content/content";
import { IconLucideNames } from "../icon";

const IconClient = React.lazy(async () =>
  import("../icon-client").then(module => ({
    default: module.IconClient,
  })),
);

const Content = React.lazy(async () =>
  import("./content/content").then(module => ({
    default: module.ContentIconInput,
  })),
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

        <React.Suspense fallback={<Loader className="p-4" />}>
          {value && (
            <IconClient
              className="size-10 text-4xl"
              name={value as IconLucideNames}
            />
          )}
        </React.Suspense>
      </div>

      <PopoverContent align="start" className="w-72 p-0">
        <React.Suspense fallback={<Loader className="p-4" />}>
          <Content onChange={onChange} value={value} setOpen={setOpen} />
        </React.Suspense>
      </PopoverContent>
    </Popover>
  );
};
