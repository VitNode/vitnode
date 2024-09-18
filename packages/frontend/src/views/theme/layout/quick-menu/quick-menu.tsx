import { cn } from '@/helpers/classnames';

import { ButtonDrawer } from './drawer/button';
import { QuickMenuWrapper } from './wrapper';

export const QuickMenu = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        'supports-backdrop-blur:bg-background/60 bg-card/75 fixed bottom-0 z-20 flex w-full border-t backdrop-blur sm:hidden',
        className,
      )}
    >
      <QuickMenuWrapper>
        <ButtonDrawer />
      </QuickMenuWrapper>
    </div>
  );
};
