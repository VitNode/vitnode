import { ReactNode } from 'react';

import { SearchToolbarDataTable } from './search-toolbar-data-table';
import { AdvancedFilterToolbarDataTable } from './advanced-filter/advanced-filter-toolbar-data-table';

export interface ToolbarDataTableProps {
  advancedFilters?: ReactNode;
  filters?: ReactNode;
  searchPlaceholder?: string;
}

export const ToolbarDataTable = ({
  advancedFilters,
  filters,
  searchPlaceholder
}: ToolbarDataTableProps) => {
  if (!searchPlaceholder && filters && filters && advancedFilters) return null;

  return (
    <div className="flex gap-2 items-center flex-wrap">
      {searchPlaceholder && <SearchToolbarDataTable searchPlaceholder={searchPlaceholder} />}
      {filters}

      {advancedFilters && (
        <AdvancedFilterToolbarDataTable>{advancedFilters}</AdvancedFilterToolbarDataTable>
      )}
    </div>
  );
};
