'use client';

import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';

import { Tabs } from '@/components/tabs/tabs';
import { TabsTrigger } from '@/components/tabs/tabs-trigger';
import { usePathname, useRouter } from '@/i18n';

const allowedSorting = ['oldest', 'newest'];

export const SortingHeaderPosts = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const t = useTranslations('forum.topics.sorting');
  const sortValue = allowedSorting.includes(searchParams.get('sort') ?? '')
    ? searchParams.get('sort') ?? 'oldest'
    : 'oldest';

  const handleSort = (value: string) => {
    if (sortValue === value) return;

    const newSearchParams = new URLSearchParams(searchParams);

    if (value !== 'oldest') {
      newSearchParams.set('sort', value);
      replace(`${pathname}?${newSearchParams.toString()}`);

      return;
    }

    newSearchParams.delete('sort');
    replace(pathname);
  };

  return (
    <Tabs>
      <TabsTrigger id="oldest" active={sortValue === 'oldest'} onClick={() => handleSort('oldest')}>
        {t('oldest')}
      </TabsTrigger>

      <TabsTrigger id="newest" active={sortValue === 'newest'} onClick={() => handleSort('newest')}>
        {t('newest')}
      </TabsTrigger>
    </Tabs>
  );
};
