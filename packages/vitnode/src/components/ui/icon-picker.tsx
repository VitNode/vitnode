import { cn } from "cn";
import React from "react";
import { useTranslations } from "use-intl";

import { humanizeIconName } from "@/lib/emoji-icon";

import { loadLucideIcons } from "./icon-registry";
import { Input } from "./input";

const COLUMNS = 8;
const ROW_HEIGHT = 36;
const OVERSCAN_ROWS = 4;

const matchesSearch = (name: string, terms: string[]) =>
  terms.every(term => name.includes(term));

const IconGrid = ({
  height,
  onPreview,
  onSelect,
  search,
  value,
}: {
  height: number;
  onPreview: (name: string | undefined) => void;
  onSelect: (name: string) => void;
  search: string;
  value?: string;
}) => {
  const t = useTranslations("core.global.emoji_icon_picker");
  const { get, names } = React.use(loadLucideIcons());
  const [scroll, setScroll] = React.useState({ search, top: 0 });
  const scrollTop = scroll.search === search ? scroll.top : 0;

  const results = React.useMemo(() => {
    const terms = search.toLowerCase().split(/\s+/).filter(Boolean);

    return terms.length
      ? names.filter(name => matchesSearch(name, terms))
      : names;
  }, [names, search]);

  if (!results.length) {
    return (
      <div
        className="text-muted-foreground flex items-center justify-center text-sm"
        style={{ height }}
      >
        {t("no_icons")}
      </div>
    );
  }

  const rowCount = Math.ceil(results.length / COLUMNS);
  const firstRow = Math.max(
    0,
    Math.floor(scrollTop / ROW_HEIGHT) - OVERSCAN_ROWS,
  );
  const lastRow = Math.min(
    rowCount,
    Math.ceil((scrollTop + height) / ROW_HEIGHT) + OVERSCAN_ROWS,
  );

  return (
    <div
      className="overflow-y-auto overscroll-contain"
      key={search}
      onMouseLeave={() => onPreview(undefined)}
      onScroll={event =>
        setScroll({ search, top: event.currentTarget.scrollTop })
      }
      style={{ height }}
    >
      <div
        className="relative w-full"
        style={{ height: rowCount * ROW_HEIGHT }}
      >
        <div
          className="absolute inset-x-0 top-0 grid grid-cols-8"
          style={{ transform: `translateY(${firstRow * ROW_HEIGHT}px)` }}
        >
          {results.slice(firstRow * COLUMNS, lastRow * COLUMNS).map(name => {
            const Icon = get(name);
            const label = humanizeIconName(name);

            if (!Icon) return null;

            return (
              <button
                aria-label={label}
                aria-pressed={value === name}
                className={cn(
                  "text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring flex aspect-square items-center justify-center rounded-md transition-colors focus-visible:ring-2 focus-visible:outline-none",
                  value === name &&
                    "bg-accent text-accent-foreground ring-primary ring-2",
                )}
                key={name}
                onClick={() => onSelect(name)}
                onFocus={() => onPreview(name)}
                onMouseEnter={() => onPreview(name)}
                title={label}
                type="button"
              >
                {React.createElement(Icon, { className: "size-4.5" })}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const IconPicker = ({
  autoFocus,
  height = 288,
  onSelect,
  value,
}: {
  autoFocus?: boolean;
  height?: number;
  onSelect: (name: string) => void;
  value?: string;
}) => {
  const t = useTranslations("core.global.emoji_icon_picker");
  const [search, setSearch] = React.useState("");
  const [preview, setPreview] = React.useState<string>();

  return (
    <div className="flex flex-col">
      <div className="px-2 pt-2 pb-1">
        <Input
          autoFocus={autoFocus}
          className="bg-muted h-8"
          onChange={event => setSearch(event.target.value)}
          placeholder={t("search_icons")}
          type="search"
          value={search}
        />
      </div>

      <React.Suspense
        fallback={
          <div
            className="text-muted-foreground flex items-center justify-center text-sm"
            style={{ height }}
          >
            {t("loading_icons")}
          </div>
        }
      >
        <IconGrid
          height={height}
          onPreview={setPreview}
          onSelect={onSelect}
          search={search}
          value={value}
        />
      </React.Suspense>

      <div className="flex min-h-11 items-center border-t px-3 py-1">
        <span className="text-muted-foreground truncate text-xs">
          {preview ? humanizeIconName(preview) : t("hint_icon")}
        </span>
      </div>
    </div>
  );
};
