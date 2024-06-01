import { useTranslations } from "next-intl";
import { Menu } from "lucide-react";

import { ItemItemNavAdminProps, LinkItemNavAdmin } from "./link";
import { Icon } from "@/components/icon/icon";

interface Props {
  id: string;
  items: ItemItemNavAdminProps[];
  onClickItem?: () => void;
}

export const ItemNavAdmin = ({ id, items }: Props) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const t = useTranslations(`${id}.admin`);

  return (
    <div>
      {id !== "core" && (
        <div className="text-muted-foreground text-sm px-4">
          {t("nav.title")}
        </div>
      )}

      <div className="transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden">
        <ul className="py-2 space-y-1">
          {items.map(item => (
            <li key={item.id}>
              <LinkItemNavAdmin
                key={item.id}
                href={`/admin/${id}/${item.href}`}
                id={item.id}
                primaryId={id}
              >
                {item.icon ? <Icon name={item.icon} /> : <Menu />}
              </LinkItemNavAdmin>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
