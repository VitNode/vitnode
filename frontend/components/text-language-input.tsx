import * as React from "react";
import { useLocale } from "next-intl";

import { useGlobals } from "@/hooks/core/use-globals";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "./ui/select";
import { FormControl } from "./ui/form";
import { TextLanguage } from "@/graphql/hooks";
import { cn } from "@/functions/classnames";

interface Props
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "value"
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
    locale ?? defaultLanguage
  );
  const valueAsArray = Array.isArray(value) ? value : [];
  const currentValue =
    valueAsArray.find(item => item.language_code === selectedLanguage)?.value ??
    "";

  return (
    <div className={cn("flex gap-2", className)}>
      <Input
        className="flex-grow max-h-full"
        type="text"
        onChange={e => {
          const value = e.target.value;

          if (value.length > 0) {
            onChange([
              ...valueAsArray.filter(
                item => item.language_code !== selectedLanguage
              ),
              {
                language_code: selectedLanguage,
                value: value
              }
            ]);

            return;
          }

          onChange(
            valueAsArray.filter(item => item.language_code !== selectedLanguage)
          );
        }}
        value={currentValue}
        {...props}
      />

      {languages.length > 1 && (
        <Select onValueChange={setSelectedLanguage} value={selectedLanguage}>
          <FormControl>
            <SelectTrigger className="basis-64 max-h-full">
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
