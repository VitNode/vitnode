import * as React from 'react';
import { useLocale } from 'next-intl';

import { Input } from './input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select';
import { FormControl } from './form';

import { TextLanguage } from '../../graphql/graphql';
import { useGlobals } from '../../hooks/use-globals';
import { cn } from '../../helpers/classnames';

interface Props
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'value'
  > {
  onChange: (value: TextLanguage[]) => void;
  value: TextLanguage[];
  className?: string;
}

export const TextLanguageInput = ({
  className,
  onChange,
  value,
  ...props
}: Props) => {
  const locale = useLocale();
  const { defaultLanguage, languages: languagesFromGlobal } = useGlobals();
  const languages = languagesFromGlobal.filter(item => item.allow_in_input);
  const [selectedLanguage, setSelectedLanguage] = React.useState(
    locale ?? defaultLanguage,
  );
  const valueAsArray = Array.isArray(value) ? value : [];
  const currentValue =
    valueAsArray.find(item => item.language_code === selectedLanguage)?.value ??
    '';

  return (
    <div className={cn('flex w-full flex-col gap-2', className)}>
      <Input
        className="w-full"
        type="text"
        onChange={e => {
          const value = e.target.value;

          if (value.length > 0) {
            onChange([
              ...valueAsArray.filter(
                item => item.language_code !== selectedLanguage,
              ),
              {
                language_code: selectedLanguage,
                value: value,
              },
            ]);

            return;
          }

          onChange(
            valueAsArray.filter(
              item => item.language_code !== selectedLanguage,
            ),
          );
        }}
        value={currentValue}
        {...props}
      />

      {languages.length > 1 && (
        <Select onValueChange={setSelectedLanguage} value={selectedLanguage}>
          <FormControl>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {languages.map(language => (
              <SelectItem key={language.code} value={language.code}>
                {language.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
};
