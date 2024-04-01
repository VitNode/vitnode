import type { ReactNode, TransitionStartFunction } from "react";

import { SearchToolbarDataTable } from "./search";
import { AdvancedFilterToolbarDataTable } from "./advanced-filter/advanced-filter-toolbar-data-table";

export interface ToolbarDataTableProps {
  startTransition: TransitionStartFunction;
  advancedFilters?: ReactNode;
  filters?: ReactNode;
  searchPlaceholder?: string;
}

export const ToolbarDataTable = ({
  advancedFilters,
  filters,
  searchPlaceholder,
  startTransition
}: ToolbarDataTableProps): JSX.Element | null => {
  if (!searchPlaceholder && filters && filters && advancedFilters) return null;

  return (
    <div className="flex gap-2 items-center flex-wrap">
      {searchPlaceholder && (
        <SearchToolbarDataTable
          startTransition={startTransition}
          searchPlaceholder={searchPlaceholder}
        />
      )}
      {filters}

      {advancedFilters && (
        <AdvancedFilterToolbarDataTable>
          {advancedFilters}
        </AdvancedFilterToolbarDataTable>
      )}
    </div>
  );
};
