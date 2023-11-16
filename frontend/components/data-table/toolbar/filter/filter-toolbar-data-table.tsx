import { PlusCircledIcon } from '@radix-ui/react-icons';
import { ComponentType, Suspense, lazy } from 'react';
import { useSearchParams } from 'next/navigation';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Loader } from '@/components/loader/loader';

const ContentFilterToolbarDataTable = lazy(() =>
  import('./content/content-filter-toolbar-data-table').then(module => ({
    default: module.ContentFilterToolbarDataTable
  }))
);

export interface FilterToolbarDataTableProps {
  id: string;
  options: {
    label: string;
    value: string;
    icon?: ComponentType<{ className?: string }>;
  }[];
  isFetching?: boolean;
  searchState?: {
    onChange: (value: string) => void;
    value: string;
  };
  title?: string;
}

export function FilterToolbarDataTable({ id, title, ...props }: FilterToolbarDataTableProps) {
  const searchParams = useSearchParams();
  const selectedValues = searchParams.getAll(id);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-10">
          <PlusCircledIcon className="mr-2 h-4 w-4" />
          {title}
          {selectedValues.length > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge variant="secondary" className="rounded-sm px-1 font-normal lg:hidden">
                {selectedValues.length}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                <Badge variant="secondary" className="rounded-sm px-1 font-normal">
                  +{selectedValues.length}
                </Badge>
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[14rem] p-0" align="start">
        <Suspense fallback={<Loader className="p-4" />}>
          <ContentFilterToolbarDataTable id={id} title={title} {...props} />
        </Suspense>
      </PopoverContent>
    </Popover>
  );
}
