import { cn } from "cn";
import React from "react";

import { FormControl, FormMessage } from "@/components/ui/form";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";

import type { ItemAutoFormComponentProps } from "../auto-form";

import { AutoFormDesc } from "../common/desc";
import { AutoFormLabel } from "../common/label";

type AutoFormNumberProps = ItemAutoFormComponentProps &
  Omit<React.ComponentProps<typeof InputGroupInput>, "type" | "value"> & {
    unitLabel?: React.ReactNode;
  };

export const AutoFormNumber = ({
  className,
  description,
  field,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  itemParams,
  label,
  labelRight,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  multiLang,
  otherProps: { isOptional },
  unitLabel,
  ...props
}: AutoFormNumberProps) => {
  const [text, setText] = React.useState(
    typeof field.value === "number" ? String(field.value) : "",
  );

  return (
    <>
      {!!label && (
        <AutoFormLabel isOptional={isOptional} labelRight={labelRight}>
          {label}
        </AutoFormLabel>
      )}

      <InputGroup className={cn("w-48", className)}>
        <FormControl>
          <InputGroupInput
            {...field}
            inputMode="numeric"
            onChange={event => {
              const raw = event.target.value;
              setText(raw);

              const parsed = Number(raw);
              field.onChange(
                raw === "" || Number.isNaN(parsed) ? null : parsed,
              );
            }}
            type="number"
            value={text}
            {...props}
          />
        </FormControl>
        {!!unitLabel && (
          <InputGroupAddon align="inline-end">
            <InputGroupText>{unitLabel}</InputGroupText>
          </InputGroupAddon>
        )}
      </InputGroup>

      {!!description && <AutoFormDesc>{description}</AutoFormDesc>}
      <FormMessage />
    </>
  );
};
