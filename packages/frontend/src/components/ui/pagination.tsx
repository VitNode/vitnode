import { PageInfo } from '@/graphql/types';
import { usePathname, useRouter } from '@/navigation';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Button } from './button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './tooltip';

const PAGE_SIZES = [10, 20, 30, 40, 50];

export const Pagination = ({
  pageInfo,
  defaultPageSize,
}: {
  defaultPageSize: 10 | 20 | 30 | 40 | 50;
  pageInfo: PageInfo;
}) => {
  const t = useTranslations('core.global');
  const { push } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pagination = React.useMemo(
    () => ({
      first: searchParams.get('first'),
      last: searchParams.get('last'),
      cursor: searchParams.get('cursor'),
    }),
    [searchParams],
  );
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
    <div className="flex flex-wrap items-center justify-center gap-4 sm:justify-end">
      <span className="text-muted-foreground text-sm">
        {t('total_count', { count: pageInfo.totalCount })}
      </span>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <TooltipProvider>
          <Tooltip>
            <Select
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
              value={`${pageSizeValue}`}
            >
              <TooltipTrigger asChild>
                <SelectTrigger className="bg-card h-8 w-[70px]">
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

            <TooltipContent>{t('rows_per_page')}</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div className="flex items-center space-x-2">
          <Button
            ariaLabel={t('previous')}
            className="bg-card size-9"
            disabled={!pageInfo.hasPreviousPage}
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
            size="icon"
            variant="outline"
          >
            <ChevronLeftIcon className="size-4" />
          </Button>
          <Button
            ariaLabel={t('next')}
            className="bg-card size-9"
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
            size="icon"
            variant="outline"
          >
            <ChevronRightIcon className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
