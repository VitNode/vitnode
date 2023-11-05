import { useTranslations } from 'next-intl';
import { LucideIcon } from 'lucide-react';

import { cx } from '@/functions/classnames';
import { buttonVariants } from '@/components/ui/button';
import { Link, usePathname } from '@/i18n';

interface Props {
  href: string;
  icon: LucideIcon;
  id: string;
  primaryId: string;
  onClick?: () => void;
}

export const LinkItemListNavAdmin = ({ href, icon, id, onClick, primaryId }: Props) => {
  const t = useTranslations('admin');
  const pathname = usePathname();
  const Icon = icon;

  return (
    <li>
      <Link
        href={href}
        className={cx(
          buttonVariants({ variant: 'ghost', size: 'sm' }),
          'w-full justify-start text-muted-foreground relative pl-4 hover:bg-secondary font-normal',
          {
            'text-foreground font-semibold': pathname === href
          }
        )}
        onClick={onClick}
      >
        <Icon className="w-5 h-5 flex-shrink-0" />
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-expect-error */}
        <span>{t(`nav.${primaryId}.${id}`)}</span>
        {pathname === href && (
          <div className="absolute top-1/2 left-1 w-1 h-[calc(100%_-_0.5rem)] bg-primary rounded-md -translate-y-1/2" />
        )}
      </Link>
    </li>
  );
};
