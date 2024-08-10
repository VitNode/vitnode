import dynamicIconImports from 'lucide-react/dynamicIconImports';
import React from 'react';
import { useTranslations } from 'next-intl';

import { IconPickerProps } from '../content';
import { Button } from '@/components/ui/button';

import { IconClient } from '../../../icon-client';

interface Props extends IconPickerProps {
  search: string;
}

const iconNamesArray = Object.keys(dynamicIconImports);

export const IconsContentIconInput = ({
  onChange,
  search,
  setOpen,
  value,
}: Props) => {
  const t = useTranslations('core.icon_picker.icons');
  const data = iconNamesArray.filter(name =>
    name.toLowerCase().includes(search.toLowerCase()),
  );

  if (data.length === 0) {
    return <span className="text-muted-foreground">{t('not_found')}</span>;
  }

  return (
    <>
      {data.slice(0, 42).map(name => (
        <Button
          key={name}
          size="icon"
          ariaLabel={name}
          variant={value === name ? 'default' : 'ghost'}
          onClick={() => {
            if (value === name) {
              onChange('');
              setOpen(false);

              return;
            }

            onChange(name);
            setOpen(false);
          }}
        >
          <IconClient name={name} />
        </Button>
      ))}
    </>
  );
};
