import { SearchToolbarDataTable } from './search-toolbar-data-table';

export interface ToolbarDataTableProps {
  searchPlaceholder?: string;
}

export const ToolbarDataTable = ({ searchPlaceholder }: ToolbarDataTableProps) => {
  if (!searchPlaceholder) return null;

  return <SearchToolbarDataTable searchPlaceholder={searchPlaceholder} />;
};
