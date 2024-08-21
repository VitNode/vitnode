import React from 'react';

import { SearchToolbarDataTable } from './search';
import { AdvancedFilterToolbarDataTable } from './advanced-filter/advanced-filter-toolbar-data-table';

export interface ToolbarDataTableProps {
  startTransition: React.TransitionStartFunction;
  advancedFilters?: React.ReactNode;
  filters?: React.ReactNode;
  searchPlaceholder?: string;
}

export const ToolbarDataTable = ({
  advancedFilters,
  filters,
  searchPlaceholder,
  startTransition,
}: ToolbarDataTableProps) => {
  if (!searchPlaceholder && !filters && !advancedFilters) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
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
