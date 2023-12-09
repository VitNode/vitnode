import { Smile } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Suspense, lazy } from 'react';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Loader } from '@/components/loader/loader';

const ContentEmojiButtonEditor = lazy(() =>
  import('./content').then(module => ({
    default: module.ContentEmojiButtonEditor
  }))
);

export const EmojiButtonEditor = () => {
  const t = useTranslations('core.editor.emoji');

  return (
    <Popover modal>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon">
                <Smile />
              </Button>
            </PopoverTrigger>
          </TooltipTrigger>

          <PopoverContent className="p-0 w-[23rem] overflow-y-auto">
            <Suspense fallback={<Loader className="p-4" />}>
              <ContentEmojiButtonEditor />
            </Suspense>
          </PopoverContent>

          <TooltipContent side="bottom">{t('title')}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </Popover>
  );
};
