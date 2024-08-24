'use client';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ShowCoreNav } from '@/graphql/types';
import { useTextLang } from '@/hooks/use-text-lang';
import { Link, usePathname } from '@/navigation';
import { ChevronDown } from 'lucide-react';
import React from 'react';

import { useNav } from './hooks/use-nav';

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
        asChild
        className="px-6"
        size="sm"
        variant={active ? 'secondary' : 'ghost'}
      >
        <Link
          href={href}
          rel={external ? 'noopener noreferrer' : undefined}
          target={external ? '_blank' : undefined}
        >
          {content}
        </Link>
      </Button>
    );
  }

  return (
    <Popover
      onOpenChange={val => {
        setOpenChild(val ? id : null);
      }}
      open={openChild === id}
    >
      <PopoverTrigger asChild>
        <Button
          className="px-6"
          size="sm"
          variant={active ? 'default' : 'ghost'}
        >
          {content}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-fit max-w-96 p-2">
        {children.map(item => {
          const icon = icons.find(childIcon => childIcon.id === item.id)?.icon;

          return (
            <Button
              asChild
              className="group h-auto w-full justify-start gap-4 px-4 py-2"
              key={item.id}
              onClick={() => {
                setOpenChild(null);
              }}
              size="sm"
              variant="ghost"
            >
              <Link
                href={item.href}
                rel={item.external ? 'noopener noreferrer' : undefined}
                target={item.external ? '_blank' : undefined}
              >
                {icon && (
                  <div className="group-hover:bg-primary-foreground group-hover:text-primary flex size-10 shrink-0 items-center justify-center rounded-sm border text-xl transition-colors [&>svg]:size-5">
                    {icon}
                  </div>
                )}

                <div>
                  {convertText(item.name)}
                  {item.description.length > 0 && (
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
