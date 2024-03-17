import { useSortable } from "@dnd-kit/sortable";
import { ChevronRight, ExternalLink, Menu } from "lucide-react";
import { CSS } from "@dnd-kit/utilities";
import { useTranslations } from "next-intl";
import type { UniqueIdentifier } from "@dnd-kit/core";
import type { CSSProperties } from "react";

import { cn } from "@/functions/classnames";
import { Button } from "@/components/ui/button";
import type { ShowCoreNav } from "@/graphql/hooks";
import { useTextLang } from "@/hooks/core/use-text-lang";
import { ActionsTableNavAdmin } from "./actions/actions";
import type { FlatTree } from "@/hooks/core/drag&drop/use-functions";

interface Props extends FlatTree<Omit<ShowCoreNav, "__typename">> {
  indentationWidth: number;
  active?: boolean;
  isDropHere?: boolean;
  isOpenChildren?: boolean;
  onCollapse?: (id: UniqueIdentifier) => void;
  overlay?: boolean;
}

export const ItemContentTableContentNavAdmin = ({
  active,
  depth,
  description,
  external,
  href,
  id,
  indentationWidth,
  isDropHere = false,
  isOpenChildren,
  name,
  onCollapse,
  overlay,
  ...props
}: Props) => {
  const t = useTranslations("admin.core.styles.nav");
  const {
    attributes,
    isDragging,
    listeners,
    setDraggableNodeRef,
    setDroppableNodeRef,
    transform,
    transition
  } = useSortable({
    id,
    animateLayoutChanges: ({ isSorting, wasDragging }) =>
      isSorting || wasDragging ? false : true
  });

  const allowOpenChildren = props.children.length > 0 && onCollapse;
  const { convertText } = useTextLang();

  return (
    <div
      ref={setDroppableNodeRef}
      className={cn({
        "pl-[var(--spacing)]": !overlay
      })}
      style={
        {
          "--spacing": `${indentationWidth * depth}px`
        } as CSSProperties
      }
    >
      <div
        className={cn(
          "p-4 flex gap-2 bg-card items-center transition-[background-color,opacity] relative border",
          {
            "animate-pulse bg-primary/20": isDropHere,
            "z-10": isDragging,
            "opacity-50": active
          }
        )}
        style={{
          transform: CSS.Transform.toString(transform),
          transition
        }}
        ref={setDraggableNodeRef}
      >
        <Button
          className="sm:flex hidden flex-shrink-0 focus:outline-none text-muted-foreground hover:text-foreground cursor-grab"
          variant="ghost"
          size="icon"
          ariaLabel=""
          {...attributes}
          {...listeners}
        >
          <Menu />
        </Button>

        {allowOpenChildren && (
          <Button
            onClick={() => onCollapse(id)}
            variant="ghost"
            size="icon"
            ariaLabel=""
          >
            <ChevronRight
              className={cn("transition-transform text-muted-foreground", {
                "rotate-90": isOpenChildren
              })}
            />
          </Button>
        )}

        <div className="flex flex-col flex-1">
          <div className="flex gap-2 items-center">
            <span className="font-semibold">{convertText(name)}</span>
          </div>

          <span className="text-muted-foreground text-sm line-clamp-2 flex gap-2 items-center">
            {t("href", { href })}{" "}
            {external && <ExternalLink className="size-4" />}
          </span>

          {description.length > 0 && (
            <span className="text-muted-foreground text-sm line-clamp-2">
              {convertText(description)}
            </span>
          )}
        </div>

        <ActionsTableNavAdmin
          id={id}
          name={name}
          href={href}
          description={description}
          external={external}
          {...props}
        />
      </div>
    </div>
  );
};
