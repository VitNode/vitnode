'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import React from 'react';

import { badgeVariants } from './badge';
import { Input } from './input';

interface TagsInputItemProps {
  id: number | string;
  value: string;
}

interface Props
  extends Omit<React.HTMLAttributes<HTMLInputElement>, 'onChange'> {
  className?: string;
  disabled?: boolean;
  onChange: (
    value?: TagsInputItemProps | TagsInputItemProps[] | undefined,
  ) => void;
}

interface MultiProps extends Props {
  multiple?: true;
  value?: TagsInputItemProps[] | undefined;
}

interface SingleProps extends Props {
  multiple?: never;
  value?: TagsInputItemProps | undefined;
}

export const TagsInput = ({
  multiple,
  onChange,
  value: valueFromProps,
  disabled,
  ...rest
}: MultiProps | SingleProps) => {
  const values: TagsInputItemProps[] = Array.isArray(valueFromProps)
    ? valueFromProps
    : valueFromProps
      ? [valueFromProps]
      : [];
  const [textInput, setTextInput] = React.useState('');

  return (
    <div className="space-y-3">
      {values.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <AnimatePresence>
            {values.map(item => {
              const onRemove = () => {
                if (multiple) {
                  onChange(values.filter(value => value.id !== item.id));

                  return;
                }

                onChange();
              };

              return (
                <motion.div
                  animate={{ opacity: 1, scale: 1 }}
                  className={badgeVariants({
                    variant: 'outline',
                    className: 'shrink-0 cursor-pointer [&>svg]:size-4',
                  })}
                  exit={{ opacity: 0, scale: 0.5 }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  key={item.id}
                  layout
                  onClick={e => {
                    e.stopPropagation();
                    e.preventDefault();
                    onRemove();
                  }}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      e.stopPropagation();
                      e.preventDefault();
                      onRemove();
                    }
                  }}
                  tabIndex={0}
                >
                  {item.value} <X />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {((!multiple && values.length <= 0) || multiple) && (
        <Input
          disabled={(!multiple && values.length > 0) || disabled}
          onChange={e => {
            setTextInput(e.target.value);
          }}
          onKeyDown={e => {
            if ((e.key === 'Enter' || e.key === ',') && textInput) {
              e.preventDefault();
              const items = textInput.split(',').map(value => value.trim());

              onChange([
                ...values,
                ...items.map(value => ({
                  id: Math.random() * 1000,
                  value,
                })),
              ]);
              setTextInput('');
            }
          }}
          value={textInput}
          {...rest}
          type="text"
        />
      )}
    </div>
  );
};
