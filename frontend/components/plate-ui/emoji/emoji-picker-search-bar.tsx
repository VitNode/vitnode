import { type UseEmojiPickerType } from '@udecode/plate-emoji';
import { cn } from '@udecode/cn';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export type EmojiPickerSearchBarProps = Pick<
  UseEmojiPickerType,
  'searchValue' | 'setSearch' | 'clearSearch'
>;

export function EmojiPickerSearchBar({
  clearSearch,
  searchValue,
  setSearch
}: EmojiPickerSearchBarProps) {
  const t = useTranslations('core');

  return (
    <div className="flex items-center px-2 mb-1 gap-2">
      <div className="relative flex grow">
        <Input
          type="text"
          placeholder={t('search_placeholder')}
          autoComplete="off"
          aria-label={t('search')}
          onChange={event => setSearch(event.target.value)}
          value={searchValue}
          className="h-9"
        />

        {searchValue && (
          <Button
            tooltip={t('clear')}
            type="button"
            variant="ghost"
            size="icon"
            className={cn('absolute right-0 top-1/2 -translate-y-1/2 size-9')}
            onClick={clearSearch}
          >
            <X className="size-6" />
          </Button>
        )}
      </div>

      {/* <EmojiSkinTone /> */}
    </div>
  );
}
