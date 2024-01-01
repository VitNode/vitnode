import { cn } from '@udecode/cn';
import { EmojiSettings, type UseEmojiPickerType } from '@udecode/plate-emoji';

import { EmojiPickerContent } from './emoji-picker-content';
import { EmojiPickerNavigation } from './emoji-picker-navigation';
import { EmojiPickerPreview } from './emoji-picker-preview';
import { EmojiPickerSearchBar } from './emoji-picker-search-bar';

export function EmojiPicker({
  clearSearch,
  emoji,
  emojiLibrary,
  focusedCategory,
  handleCategoryClick,
  hasFound,
  isSearching,
  onMouseOver,
  onSelectEmoji,
  refs,
  searchResult,
  searchValue,
  setSearch,
  settings = EmojiSettings,
  visibleCategories
}: UseEmojiPickerType) {
  return (
    <div className={cn('flex flex-col rounded bg-popover h-[350px] w-[316px] shadow-md')}>
      <EmojiPickerNavigation
        emojiLibrary={emojiLibrary}
        focusedCategory={focusedCategory}
        onClick={handleCategoryClick}
      />
      <EmojiPickerSearchBar
        setSearch={setSearch}
        searchValue={searchValue}
        clearSearch={clearSearch}
      />
      <EmojiPickerContent
        emojiLibrary={emojiLibrary}
        isSearching={isSearching}
        searchResult={searchResult}
        visibleCategories={visibleCategories}
        settings={settings}
        onSelectEmoji={onSelectEmoji}
        onMouseOver={onMouseOver}
        refs={refs}
      />
      <EmojiPickerPreview emoji={emoji} hasFound={hasFound} isSearching={isSearching} />
    </div>
  );
}
