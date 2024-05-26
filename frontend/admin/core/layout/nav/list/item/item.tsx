import { ChevronDown } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { useTranslations } from "next-intl";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/functions/classnames";
import { LinkItemListNavAdmin, ItemListNavAdminProps } from "./link";
import { usePathname } from "@/utils/i18n";

interface Props {
  activeItems: string[];
  id: string;
  items: ItemListNavAdminProps[];
  setActiveItems: Dispatch<SetStateAction<string[]>>;
  onClickItem?: () => void;
}

export const ItemListNavAdmin = ({
  activeItems,
  id,
  items,
  onClickItem,
  setActiveItems
}: Props) => {
  const pathname = usePathname();
  const pathnameId = pathname.split("/").at(2);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const t = useTranslations(`${id}.admin`);

  return (
    <Accordion.Item value={id}>
      <Accordion.Header>
        <Accordion.Trigger
          className={buttonVariants({
            variant: id === pathnameId ? "default" : "ghost",
            size: "sm",
            className: cn("w-full justify-start flex gap-2", {
              ["hover:bg-accent"]: id !== pathnameId
            })
          })}
          onClick={() =>
            setActiveItems(prev =>
              prev.includes(id)
                ? prev.filter(item => item !== id)
                : [...prev, id]
            )
          }
        >
          <span>{t("nav.title")}</span>
          <ChevronDown
            className={cn(
              "w-5 h-5 ml-auto transition-transform flex-shrink-0",
              {
                "transform rotate-180": activeItems.includes(id)
              }
            )}
          />
        </Accordion.Trigger>
      </Accordion.Header>

      <Accordion.Content className="transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden">
        <ul className="py-2">
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
      </Accordion.Content>
    </Accordion.Item>
  );
};
