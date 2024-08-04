'use client';

import { TestingActionEmailSettingsAdmin } from './testing/testing';

export const ActionsEmailSettingsAdmin = ({
  disabled,
}: {
  disabled: boolean;
}) => {
  return <TestingActionEmailSettingsAdmin disabled={disabled} />;
};
