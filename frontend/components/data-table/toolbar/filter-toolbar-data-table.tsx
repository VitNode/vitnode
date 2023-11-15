import { CheckIcon, PlusCircledIcon } from '@radix-ui/react-icons';
import { ComponentType } from 'react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';

import { cx } from '@/functions/classnames';
import { usePathname, useRouter } from '@/i18n';

import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';
import { Button } from '../../ui/button';
import { Separator } from '../../ui/separator';
import { Badge } from '../../ui/badge';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from '../../ui/command';

interface Props {
  id: string;
  options: {
    label: string;
    value: string;
    icon?: ComponentType<{ className?: string }>;
  }[];
  title?: string;
}

export function FilterToolbarDataTable({ id, options, title }: Props) {
  const t = useTranslations('core');
  const { push } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedValues = searchParams.getAll(id);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-10">
          <PlusCircledIcon className="mr-2 h-4 w-4" />
          {title}
          {selectedValues.length > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge variant="secondary" className="rounded-sm px-1 font-normal lg:hidden">
                {selectedValues.length}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                <Badge variant="secondary" className="rounded-sm px-1 font-normal">
                  +{selectedValues.length}
                </Badge>
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>{t('no_results')}</CommandEmpty>
            <CommandGroup>
              {options.map(option => {
                const isSelected = selectedValues.findIndex(v => v === option.value) !== -1;

                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      const params = new URLSearchParams(searchParams);
                      if (isSelected) {
                        params.delete(id, option.value);
                      } else {
                        params.append(id, option.value);
                      }

                      const query = params.toString();

                      push(query ? `${pathname}?${params.toString()}` : pathname);
                    }}
                  >
                    <div
                      className={cx(
                        'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                        isSelected
                          ? 'bg-primary text-primary-foreground'
                          : 'opacity-50 [&_svg]:invisible'
                      )}
                    >
                      <CheckIcon className={cx('h-4 w-4')} />
                    </div>
                    {option.icon && <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />}
                    <span>{option.label}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedValues.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => push(pathname)}
                    className="justify-center text-center"
                  >
                    {t('clear')}
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
