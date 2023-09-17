import { ItemQuickMenu } from './item/item-quick-menu';

export const QuickMenu = () => {
  return (
    <div className="supports-backdrop-blur:bg-background/60 sticky bottom-0 z-50 w-full border-t bg-card/75 backdrop-blur sm:hidden flex">
      <ItemQuickMenu active>Test</ItemQuickMenu>
      <ItemQuickMenu>Test</ItemQuickMenu>
      <ItemQuickMenu>Test</ItemQuickMenu>
      <ItemQuickMenu>Test</ItemQuickMenu>
    </div>
  );
};
