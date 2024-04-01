import * as Lucide from "lucide-react";
import { useTranslations } from "next-intl";

import { Icon, type IconLucideNames } from "@/components/icon/icon";
import type { IconInputProps } from "../content";
import { Button } from "@/components/ui/button";

export interface IconsContentIconInputProps extends IconInputProps {
  search: string;
}

const iconNamesArray = Object.keys(Lucide.icons) as IconLucideNames[];

export const IconsContentIconInput = ({
  onChange,
  search,
  setOpen,
  value
}: IconsContentIconInputProps): JSX.Element => {
  const t = useTranslations("core.icon_picker.icons");
  const data = iconNamesArray.filter((name): boolean =>
    name.toLowerCase().includes(search.toLowerCase())
  );

  if (data.length === 0) {
    return <span className="text-muted-foreground">{t("not_found")}</span>;
  }

  return (
    <>
      {data.slice(0, 42).map(
        (name): JSX.Element => (
          <Button
            key={name}
            size="icon"
            ariaLabel={name}
            variant={value === name ? "default" : "ghost"}
            onClick={(): void => {
              if (value === name) {
                onChange("");
                setOpen(false);

                return;
              }

              onChange(name);
              setOpen(false);
            }}
          >
            <Icon name={name} />
          </Button>
        )
      )}
    </>
  );
};
