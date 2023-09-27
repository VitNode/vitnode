import Link from 'next-intl/link';

import { cx } from '@/functions/classnames';
import { buttonVariants } from '@/components/ui/button';

interface Props {
  href: string;
  text: string;
}

export const LinkItemListNavAdmin = ({ href, text }: Props) => {
  return (
    <li>
      <Link
        href={href}
        className={cx(
          buttonVariants({ variant: 'ghost' }),
          'w-full justify-start text-muted-foreground'
        )}
      >
        <span className="ml-5">{text}</span>
      </Link>
    </li>
  );
};
