import { buttonVariants } from "@/components/ui/button";
import { DrawerClose } from "@/components/ui/drawer";
import { cn } from "@/functions/classnames";
import type { ShowCoreNav } from "@/graphql/hooks";
import { useTextLang } from "@/hooks/core/use-text-lang";
import { Link, usePathname } from "@/utils/i18n";
import { classNameDrawerQuickMenu } from "../drawer";

export const ItemNavDrawerQuickMenu = ({
  description,
  external,
  href,
  id,
  name
}: Omit<ShowCoreNav, "__typename" | "children">) => {
  const { convertText } = useTextLang();
  const pathname = usePathname();
  const active =
    href === pathname || (pathname.startsWith(href) && href !== "/");

  return (
    <DrawerClose key={id} asChild>
      <Link
        href={href}
        className={cn(
          buttonVariants({
            variant: "ghost",
            className: cn(
              classNameDrawerQuickMenu,
              "flex-col h-auto items-start gap-1",
              {
                "bg-accent": active
              }
            )
          })
        )}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        <span>{convertText(name)}</span>
        {description.length > 0 && (
          <span className="text-sm leading-none text-muted-foreground">
            {convertText(description)}
          </span>
        )}
      </Link>
    </DrawerClose>
  );
};
