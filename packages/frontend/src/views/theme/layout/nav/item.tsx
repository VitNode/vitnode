'use client';

import { ChevronDown } from 'lucide-react';
import React from 'react';

import { useTextLang } from '@/hooks/use-text-lang';
import { Link, usePathname } from '@/navigation';
import { Button } from '@/components/ui/button';
import { ShowCoreNav } from '@/graphql/types';
import { useNav } from './hooks/use-nav';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface Props extends Omit<ShowCoreNav, 'icon'> {
  icons: { icon: React.ReactNode; id: number }[];
}

export const ItemNav = ({
  children,
  external,
  href,
  name,
  icons,
  id,
}: Props) => {
  const { convertText } = useTextLang();
  const { setOpenChild, openChild } = useNav();
  const pathname = usePathname();
  const active = pathname === href;

  const content = (
    <>
      {icons.find(icon => icon.id === id)?.icon}
      {convertText(name)} {children.length > 0 && <ChevronDown />}
    </>
  );

  if (children.length === 0) {
    return (
      <Button
        className="px-6"
        variant={active ? 'secondary' : 'ghost'}
        size="sm"
        asChild
      >
        <Link
          href={href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
        >
          {content}
        </Link>
      </Button>
    );
  }

  return (
    <Popover
      open={openChild === id}
      onOpenChange={val => {
        setOpenChild(val ? id : null);
      }}
    >
      <PopoverTrigger asChild>
        <Button
          className="px-6"
          variant={active ? 'default' : 'ghost'}
          size="sm"
        >
          {content}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-fit max-w-96 p-2">
        {children.map(item => {
          const icon = icons.find(childIcon => childIcon.id === item.id)?.icon;

          return (
            <Button
              key={item.id}
              className="group h-auto w-full justify-start gap-4 px-4 py-2"
              variant="ghost"
              size="sm"
              onClick={() => setOpenChild(null)}
              asChild
            >
              <Link
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
              >
                {icon && (
                  <div className="group-hover:bg-primary-foreground group-hover:text-primary flex size-10 shrink-0 items-center justify-center rounded-sm border text-xl transition-colors [&>svg]:size-5">
                    {icon}
                  </div>
                )}

                <div>
                  {convertText(item.name)}
                  {item.description && (
                    <p className="text-muted-foreground line-clamp-2 truncate whitespace-normal text-sm leading-snug">
                      {convertText(item.description)}
                    </p>
                  )}
                </div>
              </Link>
            </Button>
          );
        })}
      </PopoverContent>
    </Popover>
  );
};
