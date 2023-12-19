import * as Lucide from 'lucide-react';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { DialogClose } from '@radix-ui/react-dialog';

import { DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { IconDynamic, type IconDynamicNames } from '../icon-dynamic';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

const IconNamesArray = Object.keys(Lucide.icons) as IconDynamicNames[];

interface Props {
  onChange: (icon: IconDynamicNames) => void;
}

export const ContentIconPickInput = ({ onChange }: Props) => {
  const t = useTranslations('core');
  const [search, setSearch] = useState('');
  const iconsAfterSearch = IconNamesArray.filter(name =>
    name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <DialogHeader>
        <DialogTitle>{t('icon_picker.title')}</DialogTitle>
      </DialogHeader>

      <Input
        placeholder={t('icon_picker.placeholder')}
        onChange={e => setSearch(e.target.value)}
        value={search}
      />

      <div className="flex flex-wrap gap-2 items-center justify-center">
        {iconsAfterSearch.length > 0 ? (
          iconsAfterSearch.slice(0, 52).map(name => {
            return (
              <TooltipProvider key={name}>
                <Tooltip>
                  <DialogClose asChild>
                    <TooltipTrigger asChild>
                      <Button
                        className="[&>svg]:w-8 [&>svg]:h-8 w-14 h-14"
                        variant="outline"
                        size="icon"
                        onClick={() => onChange(name)}
                      >
                        <IconDynamic name={name} />
                      </Button>
                    </TooltipTrigger>
                  </DialogClose>
                  <TooltipContent>{name}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          })
        ) : (
          <p>{t('no_results')}</p>
        )}
      </div>
    </>
  );
};
