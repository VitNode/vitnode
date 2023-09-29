import { useTranslations } from 'next-intl';

import { cx } from '@/functions/classnames';
import { buttonVariants } from '@/components/ui/button';
import { Link, usePathname } from '@/i18n';

interface Props {
  href: string;
  id: string;
  primaryId: string;
}

export const LinkItemListNavAdmin = ({ href, id, primaryId }: Props) => {
  const t = useTranslations('admin');
  const pathname = usePathname();

  return (
    <li>
      <Link
        href={href}
        className={cx(
          buttonVariants({ variant: pathname === href ? 'outline' : 'ghost' }),
          'w-full justify-start text-muted-foreground',
          {
            'font-semibold text-inherit': pathname === href
          }
        )}
      >
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-expect-error */}
        <span className="ml-5">{t(`nav.${primaryId}.${id}`)}</span>
      </Link>
    </li>
  );
};
