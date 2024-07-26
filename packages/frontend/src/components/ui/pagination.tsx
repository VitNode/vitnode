import { useTranslations } from 'next-intl';
import React from 'react';
import { useSearchParams } from 'next/navigation';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

import { PageInfo } from '@/graphql/graphql';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './tooltip';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select';
import { usePathname, useRouter } from '@/navigation';
import { Button } from './button';

const PAGE_SIZES = [10, 20, 30, 40, 50];

export const Pagination = ({
  pageInfo,
  defaultPageSize,
}: {
  defaultPageSize: 10 | 20 | 30 | 40 | 50;
  pageInfo: PageInfo;
}) => {
  const t = useTranslations('core');
  const { push } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pagination = {
    first: searchParams.get('first'),
    last: searchParams.get('last'),
    cursor: searchParams.get('cursor'),
  };
  const pageSizeValue: number = React.useMemo(() => {
    if (PAGE_SIZES.includes(Number(pagination.first))) {
      return Number(pagination.first);
    }

    if (PAGE_SIZES.includes(Number(pagination.last))) {
      return Number(pagination.last);
    }

    return defaultPageSize;
  }, [pagination, defaultPageSize]);

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 px-2 pt-4 sm:justify-end">
      <span className="text-muted-foreground text-sm">
        {t('table.total_count', { count: pageInfo.totalCount })}
      </span>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <TooltipProvider>
          <Tooltip>
            <Select
              value={`${pageSizeValue}`}
              onValueChange={value => {
                const params = new URLSearchParams(searchParams.toString());
                if (params.has('last')) {
                  params.set('last', value);
                  params.delete('first');
                } else {
                  params.set('first', value);
                  params.delete('last');
                }
                push(`${pathname}?${params.toString()}`, {
                  scroll: false,
                });
              }}
            >
              <TooltipTrigger asChild>
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue placeholder={pageSizeValue} />
                </SelectTrigger>
              </TooltipTrigger>
              <SelectContent side="top">
                {PAGE_SIZES.map(pageSize => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <TooltipContent>{t('table.rows_per_page')}</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            disabled={!pageInfo.hasPreviousPage}
            ariaLabel={t('pagination.previous')}
            onClick={() => {
              if (!pageInfo.startCursor) return;

              const params = new URLSearchParams(searchParams.toString());
              params.set('cursor', `${pageInfo.startCursor}`);
              params.set('last', `${pageSizeValue}`);
              params.delete('first');
              push(`${pathname}?${params.toString()}`, {
                scroll: false,
              });
            }}
          >
            <ChevronLeftIcon className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            ariaLabel={t('pagination.next')}
            disabled={!pageInfo.hasNextPage}
            onClick={() => {
              if (!pageInfo.endCursor) return;

              const params = new URLSearchParams(searchParams.toString());
              params.set('cursor', `${pageInfo.endCursor}`);
              params.set('first', `${pageSizeValue}`);
              params.delete('last');
              push(`${pathname}?${params.toString()}`, {
                scroll: false,
              });
            }}
          >
            <ChevronRightIcon className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
