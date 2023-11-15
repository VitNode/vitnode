import { Filter } from 'lucide-react';
import { ComponentType } from 'react';

import { FilterToolbarDataTable } from './filter-toolbar-data-table';
import { SearchToolbarDataTable } from './search-toolbar-data-table';

import { Button } from '../../ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../../ui/sheet';

export interface ToolbarDataTableProps {
  filters?: {
    id: string;
    options: {
      label: string | number;
      value: string | number;
      icon?: ComponentType<{ className?: string }>;
    }[];
    title: string;
  }[];
  searchPlaceholder?: string;
}

export const ToolbarDataTable = ({ filters, searchPlaceholder }: ToolbarDataTableProps) => {
  // if (!searchPlaceholder) return null;

  return (
    <div className="flex gap-2 items-center flex-wrap">
      {searchPlaceholder && <SearchToolbarDataTable searchPlaceholder={searchPlaceholder} />}

      {filters &&
        filters.map(filter => (
          <FilterToolbarDataTable
            key={filter.id}
            id={filter.id}
            title={filter.title}
            options={filter.options.map(option => ({
              label: `${option.label}`,
              value: `${option.value}`,
              icon: option.icon
            }))}
          />
        ))}

      <Sheet>
        <SheetTrigger asChild>
          <Button className="ml-auto" variant="outline" size="icon">
            <Filter />
          </Button>
        </SheetTrigger>

        <SheetContent>
          <SheetHeader>
            <SheetTitle>Filter</SheetTitle>
          </SheetHeader>

          <div>test</div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
