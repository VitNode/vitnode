import { createNavigation } from 'next-intl/navigation';

import { useRouter } from './router';

const { redirect, usePathname, Link } = createNavigation();

export { Link, redirect, usePathname, useRouter };
