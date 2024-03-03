import { ChevronRight, Home } from "lucide-react";
import { forwardRef, type ReactNode } from "react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n";
import { buttonVariants } from "./button";
import { cn } from "@/functions/classnames";

interface Props {
  items: { href: string; id: string; text: string }[];
  children?: ReactNode;
}

const Breadcrumbs = forwardRef<HTMLDivElement, Props>(
  ({ children, items }, ref) => {
    const t = useTranslations("core");
    const classNameItem = cn(
      buttonVariants({
        variant: "link",
        size: "sm",
        className: "px-0 h-5 text-muted-foreground"
      })
    );

    return (
      <div className="my-2 flex justify-between gap-5 items-center" ref={ref}>
        <ul className="flex gap-2 text-muted-foreground py-3 overflow-auto">
          <li className="leading-none">
            <Link className={classNameItem} aria-label={t("home")} href="/">
              <Home />
            </Link>
          </li>

          {items.map((item, index) => (
            <li key={item.id} className="flex gap-2 items-center">
              <ChevronRight className="size-4" />
              {index === items.length - 1 ? (
                <span
                  className={cn(
                    classNameItem,
                    "text-foreground hover:no-underline"
                  )}
                >
                  {item.text}
                </span>
              ) : (
                <Link
                  className={cn(classNameItem, {
                    "text-foreground": index === items.length - 1
                  })}
                  href={item.href}
                >
                  {item.text}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {children}
      </div>
    );
  }
);

Breadcrumbs.displayName = "Breadcrumbs";

export { Breadcrumbs };
