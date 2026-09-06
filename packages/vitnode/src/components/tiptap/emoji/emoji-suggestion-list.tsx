import type { EmojiItem } from "@tiptap/extension-emoji";
import type {
  SuggestionKeyDownProps,
  SuggestionProps,
} from "@tiptap/suggestion";

import React from "react";
import { useTranslations } from "use-intl";

import { cn } from "@/lib/utils";

export interface EmojiSuggestionListRef {
  onKeyDown: (props: SuggestionKeyDownProps) => boolean;
}

export const EmojiSuggestionList = ({
  command,
  items,
  ref,
}: Pick<SuggestionProps<EmojiItem>, "command" | "items"> & {
  ref?: React.Ref<EmojiSuggestionListRef>;
}) => {
  const t = useTranslations("core.global.editor.emoji");
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [renderedItems, setRenderedItems] = React.useState(items);
  const listRef = React.useRef<HTMLDivElement>(null);

  if (renderedItems !== items) {
    setRenderedItems(items);
    setActiveIndex(0);
  }

  const select = (index: number) => {
    const item = items[index];
    if (!item) return;

    command({ name: item.name });
  };

  React.useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }) => {
      if (items.length === 0) return false;

      if (event.key === "ArrowUp") {
        setActiveIndex(current => (current + items.length - 1) % items.length);

        return true;
      }

      if (event.key === "ArrowDown") {
        setActiveIndex(current => (current + 1) % items.length);

        return true;
      }

      if (event.key === "Enter" || event.key === "Tab") {
        select(activeIndex);

        return true;
      }

      return false;
    },
  }));

  React.useEffect(() => {
    listRef.current
      ?.querySelector("[data-active='true']")
      ?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  if (items.length === 0) {
    return (
      <div className="bg-popover text-muted-foreground ring-foreground/10 rounded-md p-3 text-sm shadow-md ring-1">
        {t("empty")}
      </div>
    );
  }

  return (
    <div
      className="bg-popover text-popover-foreground ring-foreground/10 max-h-64 w-72 overflow-y-auto rounded-md p-1 shadow-md ring-1"
      ref={listRef}
      role="listbox"
    >
      {items.map((item, index) => (
        <button
          aria-selected={index === activeIndex}
          className={cn(
            "hover:bg-accent hover:text-accent-foreground flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-start text-sm",
            index === activeIndex && "bg-accent text-accent-foreground",
          )}
          data-active={index === activeIndex}
          key={item.name}
          onClick={() => select(index)}
          onMouseEnter={() => setActiveIndex(index)}
          role="option"
          type="button"
        >
          <span aria-hidden className="text-lg leading-none">
            {item.fallbackImage && !item.emoji ? (
              <img alt="" className="size-5" src={item.fallbackImage} />
            ) : (
              item.emoji
            )}
          </span>
          <span className="truncate">:{item.shortcodes[0]}:</span>
        </button>
      ))}
    </div>
  );
};
