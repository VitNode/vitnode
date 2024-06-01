import * as Lucide from "lucide-react";
import * as React from "react";
import { useTranslations } from "next-intl";

import { IconLucideNames } from "@/components/icon/icon";
import { IconInputProps } from "../content";
import { Button } from "@/components/ui/button";
import { cn } from "@/functions/classnames";

interface Props extends IconInputProps {
  search: string;
}

// export const IconLucideDynamic = React.memo(
//   ({ name, className }: { name: IconLucideNames; className?: string }) => {
//     const LucideIcon = React.lazy<React.ComponentType<Lucide.LucideProps>>(
//       async () =>
//         import("lucide-react")
//           .then(mod => mod[name as IconLucideNames])
//           .then(mod => ({ default: mod }))
//     );

//     return (
//       <React.Suspense
//         fallback={<Lucide.Loader2 className={cn("animate-spin", className)} />}
//       >
//         <LucideIcon className={className} />
//       </React.Suspense>
//     );
//   }
// );

// IconLucideDynamic.displayName = "IconLucide";

// const iconNamesArray = Object.keys(Lucide.icons) as IconLucideNames[];

export const IconsContentIconInput = ({
  onChange,
  search,
  setOpen,
  value
}: Props) => {
  const t = useTranslations("core.icon_picker.icons");
  // const data = iconNamesArray.filter(name =>
  //   name.toLowerCase().includes(search.toLowerCase())
  // );

  // if (data.length === 0) {
  //   return <span className="text-muted-foreground">{t("not_found")}</span>;
  // }

  return (
    <>
      {/* {data.slice(0, 42).map(name => (
        <Button
          key={name}
          size="icon"
          ariaLabel={name}
          variant={value === name ? "default" : "ghost"}
          onClick={() => {
            if (value === name) {
              onChange("");
              setOpen(false);

              return;
            }

            onChange(name);
            setOpen(false);
          }}
        >
          <IconLucideDynamic name={name} />
        </Button>
      ))} */}
    </>
  );
};
