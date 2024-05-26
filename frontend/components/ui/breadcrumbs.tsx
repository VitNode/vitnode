import { ChevronRight, Home } from "lucide-react";
import { ReactNode, RefCallback } from "react";
import { useTranslations } from "next-intl";

import { Link } from "@/utils/i18n";
import { buttonVariants } from "./button";
import { cn } from "@/functions/classnames";

interface Props {
  items: { href: string; id: number | string; text: string }[];
  children?: ReactNode;
  ref?: RefCallback<HTMLDivElement>;
}

export const Breadcrumbs = ({ children, items, ref }: Props) => {
  const t = useTranslations("core");
  const classNameItem = cn(
    buttonVariants({
      variant: "link",
      size: "sm",
      className: "px-0 h-5 text-muted-foreground"
    })
  );

  return (
    <div className="mb-2 flex justify-between gap-5 items-center" ref={ref}>
      <ul className="flex gap-2 text-muted-foreground py-3 overflow-auto">
        <li className="leading-none">
          <Link className={classNameItem} aria-label={t("home")} href="/">
            <Home />
          </Link>
        </li>

        {items.map(item => (
          <li key={item.id} className="flex gap-2 items-center flex-shrink-0">
            <ChevronRight className="size-4" />
            <Link className={classNameItem} href={item.href}>
              {item.text}
            </Link>
          </li>
        ))}
      </ul>

      {children}
    </div>
  );
};
