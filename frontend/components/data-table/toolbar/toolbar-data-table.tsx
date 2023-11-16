import { Filter } from 'lucide-react';
import { ReactNode } from 'react';

import { SearchToolbarDataTable } from './search-toolbar-data-table';

import { Button } from '../../ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../../ui/sheet';

export interface ToolbarDataTableProps {
  filters?: ReactNode;
  searchPlaceholder?: string;
}

export const ToolbarDataTable = ({ filters, searchPlaceholder }: ToolbarDataTableProps) => {
  if (!searchPlaceholder && filters && filters) return null;

  return (
    <div className="flex gap-2 items-center flex-wrap">
      {searchPlaceholder && <SearchToolbarDataTable searchPlaceholder={searchPlaceholder} />}
      {filters}

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
