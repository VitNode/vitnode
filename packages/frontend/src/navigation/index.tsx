// eslint-disable-next-line no-restricted-imports
import LinkFromImport from 'next/link';
import React from 'react';

import { useRouter } from './router';

const Link = (props: React.ComponentProps<typeof LinkFromImport>) => {
  return <LinkFromImport {...props} />;
};

export { Link, useRouter };
