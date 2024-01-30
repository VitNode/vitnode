import { useTranslations } from 'next-intl';
import type { LucideIcon } from 'lucide-react';

import { cx } from '@/functions/classnames';
import { buttonVariants } from '@/components/ui/button';
import { Link, usePathname } from '@/i18n';

export interface ItemListNavAdminProps {
  href: string;
  icon: LucideIcon;
  id: string;
}

interface Props extends ItemListNavAdminProps {
  primaryId: string;
  onClick?: () => void;
}

export const LinkItemListNavAdmin = ({ href, icon, id, onClick, primaryId }: Props) => {
  const t = useTranslations('admin');
  const pathname = usePathname();
  const Icon = icon;

  const active = pathname.startsWith(href);

  return (
    <li>
      <Link
        href={href}
        className={cx(
          buttonVariants({ variant: 'ghost', size: 'sm' }),
          'w-full justify-start relative pl-4 hover:bg-secondary font-normal text-foreground',
          {
            'font-semibold': active
          }
        )}
        onClick={onClick}
      >
        <Icon className="w-5 h-5 flex-shrink-0 text-muted-foreground" />
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-expect-error */}
        <span>{t(`nav.${primaryId}.${id}`)}</span>
        {active && (
          <div className="absolute top-1/2 left-1 w-1 h-[calc(100%_-_0.5rem)] bg-primary rounded-md -translate-y-1/2" />
        )}
      </Link>
    </li>
  );
};
