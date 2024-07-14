import React from 'react';
import { Toggle } from 'vitnode-frontend/components/ui/toggle';

export const ToggleToolbarEditor = ({
  children,
  disabled,
  onPressedChange,
  pressed,
}: {
  children: React.ReactNode;
  onPressedChange: () => void;
  pressed: boolean;
  disabled?: boolean;
}) => {
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
