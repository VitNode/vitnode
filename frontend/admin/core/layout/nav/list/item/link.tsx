import { useTranslations } from "next-intl";
import { Menu } from "lucide-react";

import { cn } from "@/functions/classnames";
import { buttonVariants } from "@/components/ui/button";
import { Link, usePathname } from "@/i18n";
import { Icon } from "@/components/icon/icon";

export interface ItemListNavAdminProps {
  href: string;
  id: string;
  icon?: string;
}

interface Props extends ItemListNavAdminProps {
  primaryId: string;
  onClick?: () => void;
}

export const LinkItemListNavAdmin = ({
  href,
  icon,
  id,
  onClick,
  primaryId
}: Props) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const t = useTranslations(`${primaryId}.admin.nav`);
  const pathname = usePathname();
  const active = pathname.startsWith(href);

  return (
    <li>
      <Link
        href={href}
        className={cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          "w-full justify-start relative pl-4 hover:bg-accent font-normal text-foreground [&>svg]:size-4 [&>svg]:flex-shrink-0 [&>svg]:flex [&>svg]:items-center [&>svg]:justify-center [&>svg]:text-muted-foreground",
          {
            "font-bold": active
          }
        )}
        onClick={onClick}
      >
        {icon ? <Icon name={icon} /> : <Menu />}
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-expect-error */}
        <span>{t(id)}</span>
        {active && (
          <div className="absolute top-1/2 left-1 w-1 h-[calc(100%_-_0.5rem)] bg-primary rounded-md -translate-y-1/2" />
        )}
      </Link>
    </li>
  );
};
