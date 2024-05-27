import * as React from "react";
import { useTranslations } from "next-intl";

import { LinkItemListNavAdmin, ItemListNavAdminProps } from "./link";

interface Props {
  id: string;
  items: ItemListNavAdminProps[];
  onClickItem?: () => void;
}

export const ItemListNavAdmin = ({ id, items, onClickItem }: Props) => {
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
          {items.map(el => (
            <LinkItemListNavAdmin
              key={el.id}
              href={`/admin/${id}/${el.href}`}
              id={el.id}
              primaryId={id}
              onClick={onClickItem}
              icon={el.icon}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};
