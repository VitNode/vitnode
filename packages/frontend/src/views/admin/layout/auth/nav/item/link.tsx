'use client';

import * as React from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { useTranslations } from 'next-intl';
import { ChevronDown, Menu } from 'lucide-react';

import { Link, usePathname } from '@/navigation';
import { cn } from '@/helpers/classnames';
import { Button, buttonVariants } from '@/components/ui/button';

export interface ItemItemNavAdminProps {
  href: string;
  id: string;
  children?: Omit<ItemItemNavAdminProps, 'icon'>[];
  icon?: string;
}

interface Props extends ItemItemNavAdminProps {
  icons: { icon: React.ReactNode; id: string }[];
  primaryId: string;
}

export const LinkItemNavAdmin = ({
  icons,
  href: hrefFromProps,
  primaryId,
  id,
  icon,
  children,
}: Props) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const t = useTranslations(`${primaryId}.admin.nav`);
  const pathname = usePathname();
  const href = `/admin/${primaryId}/${hrefFromProps}`;
  const active = pathname.startsWith(`/admin/${primaryId}/${id}`);
  const isChildActive =
    children?.some(child =>
      pathname.startsWith(`/admin/${primaryId}/${id}/${child.href}`),
    ) ?? false;

  const buttonClass = (active: boolean) =>
    cn(
      'hover:text-foreground/90 text-muted-foreground relative h-8 w-full justify-start font-normal [&>svg]:flex [&>svg]:size-4 [&>svg]:flex-shrink-0 [&>svg]:items-center [&>svg]:justify-center [&[data-state=open]>svg:not(:first-child)]:rotate-180',
      {
        'bg-primary/10 text-primary [&>svg]:text-primary hover:text-primary font-semibold':
          active,
      },
    );

  return (
    <Accordion.Item value={`${primaryId}_${id}`}>
      {children && children.length > 0 ? (
        <Accordion.Trigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className={buttonClass(active && !isChildActive)}
          >
            {icon ? icons.find(i => i.id === id)?.icon : <Menu />}
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-expect-error */}
            <span>{t(id)}</span>
            <ChevronDown className="ml-auto transition-transform" />
          </Button>
        </Accordion.Trigger>
      ) : (
        <Link
          href={href}
          className={cn(
            buttonVariants({ variant: 'ghost', size: 'sm' }),
            buttonClass(active),
          )}
        >
          {icon ? icons.find(i => i.id === id)?.icon : <Menu />}
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-expect-error */}
          <span>{t(id)}</span>
        </Link>
      )}

      {children && children.length > 0 && (
        <Accordion.Content className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down my-1 overflow-hidden transition-all">
          <div className="ml-7 space-y-1">
            {children.map(child => {
              const href = `/admin/${primaryId}/${id}/${child.href}`;
              const active = pathname.startsWith(href);

              return (
                <Link
                  key={`${primaryId}_${child.id}`}
                  href={href}
                  className={cn(
                    buttonVariants({ variant: 'ghost', size: 'sm' }),
                    buttonClass(active),
                  )}
                >
                  {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                  {/* @ts-expect-error */}
                  <span>{t(`${id}_${child.id}`)}</span>
                </Link>
              );
            })}
          </div>
        </Accordion.Content>
      )}
    </Accordion.Item>
  );
};
