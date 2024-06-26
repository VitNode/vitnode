import { PlusCircledIcon } from '@radix-ui/react-icons';
import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from 'vitnode-frontend/components/ui/popover';
import { Button } from 'vitnode-frontend/components/ui/button';
import { Separator } from 'vitnode-frontend/components/ui/separator';
import { Badge } from 'vitnode-frontend/components/ui/badge';
import { Loader } from 'vitnode-frontend/components/ui/loader';

import { FilterToolbarDataTableContext } from './hooks/use-filter-toolbar-data-table';

export interface FilterToolbarDataTableProps {
  children: React.ReactNode;
  id: string;
  title: string;
}

export function FilterToolbarDataTable({
  children,
  id,
  title,
}: FilterToolbarDataTableProps) {
  const searchParams = useSearchParams();
  const selectedValues = searchParams.getAll(id);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-10">
          <PlusCircledIcon className="mr-2 size-4" />
          {title}
          {selectedValues.length > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {selectedValues.length}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                <Badge
                  variant="secondary"
                  className="rounded-sm px-1 font-normal"
                >
                  +{selectedValues.length}
                </Badge>
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-56 p-0" align="start">
        <FilterToolbarDataTableContext.Provider value={{ title, id }}>
          <React.Suspense fallback={<Loader className="p-4" />}>
            {children}
          </React.Suspense>
        </FilterToolbarDataTableContext.Provider>
      </PopoverContent>
    </Popover>
  );
}
