import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

import { buttonVariants } from '@/components/ui/button';
import {
  HoverCard,
  HoverCardArrow,
  HoverCardContent,
  HoverCardTrigger
} from '@/components/ui/hover-card';
import type { ShowCoreNav } from '@/graphql/hooks';
import { useTextLang } from '@/hooks/core/use-text-lang';
import { Link, usePathname } from '@/i18n';
import { cx } from '@/functions/classnames';

export const ItemNav = ({ children, external, href, name }: ShowCoreNav) => {
  const [open, setOpen] = useState(false);
  const { convertText } = useTextLang();
  const pathname = usePathname();
  const active = href === pathname || (pathname.startsWith(href) && href !== '/');

  return (
    <li className="flex-shrink-0">
      <HoverCard open={open} onOpenChange={setOpen} openDelay={0} closeDelay={0}>
        <HoverCardTrigger asChild>
          <Link
            href={href}
            className={buttonVariants({
              variant: active ? 'default' : 'ghost',
              className: 'px-6'
            })}
            onClick={() => setOpen(false)}
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
          >
            {convertText(name)} {children.length > 0 && <ChevronDown />}
          </Link>
        </HoverCardTrigger>

        {children.length > 0 && (
          <HoverCardContent sideOffset={-5}>
            <ul className="flex gap-2 p-2 w-[30rem] flex-wrap">
              {children.map(item => {
                const activeItem =
                  item.href === pathname || (pathname.startsWith(item.href) && item.href !== '/');

                return (
                  <li key={item.id} className="flex-1 basis-[calc(50%-0.5rem)]">
                    <Link
                      href={item.href}
                      className={cx(
                        'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground h-full text-accent-foreground',
                        {
                          'bg-primary': activeItem
                        }
                      )}
                      onClick={() => setOpen(false)}
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noopener noreferrer' : undefined}
                    >
                      <div className="text-sm font-medium leading-none">
                        {convertText(item.name)}
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {convertText(item.description)}
                      </p>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <HoverCardArrow />
          </HoverCardContent>
        )}
      </HoverCard>
    </li>
  );
};
