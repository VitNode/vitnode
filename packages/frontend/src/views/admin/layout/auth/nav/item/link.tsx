'use client';

import { Button, buttonVariants } from '@/components/ui/button';
import { useSheet } from '@/components/ui/sheet';
import { cn } from '@/helpers/classnames';
import { Link, usePathname } from '@/navigation';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown, Menu } from 'lucide-react';
import React from 'react';

export interface ItemItemNavAdminProps {
  children?: Omit<ItemItemNavAdminProps, 'icon'>[];
  icon?: string;
  id: string;
}

export const LinkItemNavAdmin = ({
  icons,
  plugin_code,
  id,
  icon,
  children,
  i18n,
}: {
  i18n: {
    children?: { id: string; title: string }[];
    title: string;
  };
  icons: { icon: React.ReactNode; id: string }[];
  plugin_code: string;
} & ItemItemNavAdminProps) => {
  const pathname = usePathname();
  const href = `/admin/${plugin_code}/${id}`;
  const active = pathname.startsWith(`/admin/${plugin_code}/${id}`);
  const isChildActive =
    children?.some(child =>
      pathname.startsWith(`/admin/${plugin_code}/${id}/${child.id}`),
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
            <span>{i18n.title}</span>
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
          <span>{i18n.title}</span>
        </Link>
      )}

      {children && children.length > 0 && (
        <Accordion.Content className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down my-1 overflow-hidden transition-all">
          <div className="ml-7 space-y-1">
            {children.map(child => {
              const href = `/admin/${plugin_code}/${id}/${child.id}`;
              const active = pathname.startsWith(href);
              const title =
                i18n.children?.find(c => c.id === child.id)?.title ??
                `${id}_${child.id}`;

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
                  <span>{title}</span>
                </Link>
              );
            })}
          </div>
        </Accordion.Content>
      )}
    </Accordion.Item>
  );
};
