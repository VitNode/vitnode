'use client';

import { CommandDialog, CommandInput } from '@/components/ui/command';
import { Loader } from '@/components/ui/loader';
import { SearchIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { Suspense } from 'react';
import { useDebouncedCallback } from 'use-debounce';

const Content = React.lazy(async () =>
  import('./content').then(module => ({
    default: module.ContentSearchAsideAuthAdmin,
  })),
);

export const SearchAsideAuthAdmin = () => {
  const t = useTranslations('admin.search');
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(open => !open);
      }
    };
    document.addEventListener('keydown', down);

    return () => {
      document.removeEventListener('keydown', down);
    };
  }, []);

  const handleSearchInput = useDebouncedCallback((value: string) => {
    setSearch(value);
  }, 500);

  return (
    <>
      <button
        className="bg-secondary/50 text-muted-foreground hover:bg-accent hover:text-accent-foreground flex w-full items-center gap-2 rounded-lg border p-1.5 text-sm transition-colors max-md:hidden"
        data-search-full=""
        onClick={() => {
          setOpen(true);
        }}
        type="button"
      >
        <SearchIcon className="ms-1 size-4" />
        {t('placeholder')}
      </button>

      <CommandDialog onOpenChange={setOpen} open={open} shouldFilter={false}>
        <CommandInput
          onValueChange={handleSearchInput}
          placeholder={t('placeholder')}
        />
        <Suspense fallback={<Loader className="p-4" />}>
          <Content search={search} setOpen={setOpen} />
        </Suspense>
      </CommandDialog>
    </>
  );
};
