import React from 'react';
import { Toggle } from 'vitnode-frontend/components/ui/toggle';

interface Props {
  children: React.ReactNode;
  onPressedChange: () => void;
  pressed: boolean;
  disabled?: boolean;
}

export const ToggleToolbarEditor = ({
  children,
  disabled,
  onPressedChange,
  pressed,
}: Props) => {
  return (
    <Toggle
      pressed={pressed}
      onPressedChange={onPressedChange}
      disabled={disabled}
      size="sm"
    >
      {children}
    </Toggle>
  );
};
