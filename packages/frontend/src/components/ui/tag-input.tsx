'use client';

import React from 'react';
import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

import { badgeVariants } from './badge';
import { Input } from './input';

interface TagInputItemProps {
  id: number | string;
  value: string;
}

interface Props
  extends Omit<React.HTMLAttributes<HTMLInputElement>, 'onChange'> {
  onChange: (value?: TagInputItemProps | TagInputItemProps[]) => void;
  className?: string;
  disabled?: boolean;
}

interface MultiProps extends Props {
  multiple?: true;
  value?: TagInputItemProps[];
}

interface SingleProps extends Props {
  multiple?: never;
  value?: TagInputItemProps;
}

export const TagInput = ({
  multiple,
  onChange,
  value: valueFromProps,
  disabled,
  ...rest
}: MultiProps | SingleProps) => {
  const values: TagInputItemProps[] = Array.isArray(valueFromProps)
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
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  layout
                  className={badgeVariants({
                    variant: 'outline',
                    className: 'shrink-0 cursor-pointer [&>svg]:size-4',
                  })}
                  key={item.id}
                  tabIndex={0}
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
                >
                  {item.value} <X />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      <Input
        onChange={e => setTextInput(e.target.value)}
        value={textInput}
        disabled={(!multiple && values.length > 0) || disabled}
        onKeyDown={e => {
          if ((e.key === 'Enter' || e.key === ',') && textInput) {
            e.preventDefault();
            const items = textInput.split(',').map(value => value.trim());

            onChange([
              ...values,
              ...items.map(value => ({
                id: Math.random(),
                value,
              })),
            ]);
            setTextInput('');
          }
        }}
        {...rest}
        type="text"
      />
    </div>
  );
};
