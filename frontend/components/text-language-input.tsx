import { forwardRef, useState, type InputHTMLAttributes } from "react";
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
import type { TextLanguage } from "@/graphql/hooks";
import { cn } from "@/functions/classnames";

interface Props
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
  onChange: (value: TextLanguage[]) => void;
  value: TextLanguage[];
  className?: string;
}

const TextLanguageInput = forwardRef<HTMLInputElement, Props>(
  ({ className, onChange, value, ...props }, ref): JSX.Element => {
    const locale = useLocale();
    const { defaultLanguage, languages } = useGlobals();
    const [selectedLanguage, setSelectedLanguage] = useState(
      locale ?? defaultLanguage
    );
    const valueAsArray = Array.isArray(value) ? value : [];
    const currentValue =
      valueAsArray.find(
        (item): boolean => item.language_code === selectedLanguage
      )?.value ?? "";

    return (
      <div className={cn("flex gap-2", className)}>
        <Input
          className="flex-grow max-h-full"
          type="text"
          onChange={(e): void => {
            const value = e.target.value;

            if (value) {
              onChange([
                ...valueAsArray.filter(
                  (item): boolean => item.language_code !== selectedLanguage
                ),
                {
                  language_code: selectedLanguage,
                  value: value
                }
              ]);

              return;
            }

            onChange(
              valueAsArray.filter(
                (item): boolean => item.language_code !== selectedLanguage
              )
            );
          }}
          value={currentValue}
          ref={ref}
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
              {languages.map(
                (language): JSX.Element => (
                  <SelectItem key={language.code} value={language.code}>
                    {language.name}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
        )}
      </div>
    );
  }
);
TextLanguageInput.displayName = "TextLanguageInput";

export { TextLanguageInput };
