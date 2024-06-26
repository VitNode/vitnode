import * as React from 'react';

import { ErrorView } from '@/plugins/core/templates/views/global/error/error-view';

export interface ErrorViewProps {
  code: string | '403' | '404' | '500';
  className?: string;
}

export const ErrorViewSSR = (props: ErrorViewProps) => {
  return <ErrorView {...props} />;
};
