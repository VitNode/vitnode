'use client';

import { SearchIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

export const SearchAsideAuthAdmin = () => {
  const t = useTranslations('core');
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(open => !open);
      }
    };
    document.addEventListener('keydown', down);

    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <>
      <button
        data-search-full=""
        className="bg-secondary/50 text-muted-foreground hover:bg-accent hover:text-accent-foreground flex w-full items-center gap-2 rounded-lg border p-1.5 text-sm transition-colors max-md:hidden"
        type="button"
        onClick={() => setOpen(true)}
      >
        <SearchIcon className="ms-1 size-4" />
        {t('search_placeholder')}
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>Calendar</CommandItem>
            <CommandItem>Search Emoji</CommandItem>
            <CommandItem>Calculator</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};
