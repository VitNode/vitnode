import { Link } from "@tanstack/react-router";
import { cn } from "cn";
import { Fragment } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export interface BreadcrumbTrailContentEntry {
  content: React.ReactNode;
  href: string;
  isCurrent: boolean;
  key: string;
  /** The content renders its own list items, separators included. */
  spansItems: boolean;
}

export const BreadcrumbTrailContent = ({
  entries,
  scrollable,
}: {
  entries: readonly BreadcrumbTrailContentEntry[];
  scrollable?: boolean;
}) => {
  if (entries.length === 0) return null;

  return (
    <Breadcrumb
      className={cn(
        scrollable &&
          "no-scrollbar scroll-fade-x overflow-x-auto overscroll-x-contain",
      )}
    >
      <BreadcrumbList
        className={cn(scrollable && "flex-nowrap whitespace-nowrap")}
      >
        {entries.map((entry, index) => (
          <Fragment key={entry.key}>
            {index > 0 && <BreadcrumbSeparator />}
            {entry.spansItems ? (
              entry.content
            ) : (
              <BreadcrumbItem>
                {entry.isCurrent ? (
                  <BreadcrumbPage>{entry.content}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink
                    render={<Link to={entry.href}>{entry.content}</Link>}
                  />
                )}
              </BreadcrumbItem>
            )}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
