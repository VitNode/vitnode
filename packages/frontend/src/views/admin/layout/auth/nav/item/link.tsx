'use client';

import { Button, buttonVariants } from '@/components/ui/button';
import { useSheet } from '@/components/ui/sheet';
import { cn } from '@/helpers/classnames';
import { Link, usePathname } from '@/navigation';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown, Menu } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

export interface ItemItemNavAdminProps {
  children?: Omit<ItemItemNavAdminProps, 'icon'>[];
  href: string;
  icon?: string;
  id: string;
}

interface Props extends ItemItemNavAdminProps {
  icons: { icon: React.ReactNode; id: string }[];
  plugin_code: string;
}

export const LinkItemNavAdmin = ({
  icons,
  href: hrefFromProps,
  plugin_code,
  id,
  icon,
  children,
}: Props) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const t = useTranslations(`${plugin_code}.admin.nav`);
  const pathname = usePathname();
  const href = `/admin/${plugin_code}/${hrefFromProps}`;
  const active = pathname.startsWith(`/admin/${plugin_code}/${id}`);
  const isChildActive =
    children?.some(child =>
      pathname.startsWith(`/admin/${plugin_code}/${id}/${child.href}`),
    ) ?? false;
  const { setOpen } = useSheet();

  const buttonClass = (active: boolean) =>
    cn(
      'hover:text-foreground/90 text-muted-foreground relative h-8 w-full justify-start font-normal [&>svg]:flex [&>svg]:size-4 [&>svg]:flex-shrink-0 [&>svg]:items-center [&>svg]:justify-center [&[data-state=open]>svg:not(:first-child)]:rotate-180',
      {
        'bg-primary/10 hover:bg-primary/20 text-primary [&>svg]:text-primary hover:text-primary font-semibold':
          active,
      },
    );

  return (
    <Accordion.Item value={`${plugin_code}_${id}`}>
      {children && children.length > 0 ? (
        <Accordion.Trigger asChild>
          <Button
            className={buttonClass(active && !isChildActive)}
            size="sm"
            variant="ghost"
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
          className={cn(
            buttonVariants({ variant: 'ghost', size: 'sm' }),
            buttonClass(active),
          )}
          href={href}
          onClick={() => setOpen?.(false)}
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
              const href = `/admin/${plugin_code}/${id}/${child.href}`;
              const active = pathname.startsWith(href);

              return (
                <Link
                  className={cn(
                    buttonVariants({ variant: 'ghost', size: 'sm' }),
                    buttonClass(active),
                  )}
                  href={href}
                  key={`${plugin_code}_${child.id}`}
                  onClick={() => setOpen?.(false)}
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
