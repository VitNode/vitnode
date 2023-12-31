import { cn } from '@udecode/cn';
import { type UseEmojiPickerType } from '@udecode/plate-emoji';
import { Search, X } from 'lucide-react';

export type EmojiPickerSearchAndClearProps = Pick<
  UseEmojiPickerType,
  'i18n' | 'searchValue' | 'clearSearch'
>;

export function EmojiPickerSearchAndClear({
  clearSearch,
  i18n,
  searchValue
}: EmojiPickerSearchAndClearProps) {
  return (
    <>
      <span className={cn('absolute left-2 top-1/2 z-10 flex h-5 w-5 -translate-y-1/2')}>
        <Search />
      </span>
      {searchValue && (
        <button
          title={i18n.clear}
          aria-label="Clear"
          type="button"
          className={cn(
            'absolute right-0 top-1/2 flex h-8 w-8 -translate-y-1/2 cursor-pointer border-none bg-transparent'
          )}
          onClick={clearSearch}
        >
          <X className="h-full w-full" />
        </button>
      )}
    </>
  );
}
