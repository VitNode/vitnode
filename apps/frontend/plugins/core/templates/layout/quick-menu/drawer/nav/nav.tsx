import * as React from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import { cn } from 'vitnode-frontend/helpers/classnames';
import { buttonVariants } from 'vitnode-frontend/components/ui/button';
import { Separator } from 'vitnode-frontend/components/ui/separator';
import { useSession } from 'vitnode-frontend/hooks/use-session';

import { ItemNavDrawerQuickMenu } from './item';
import { useTextLang } from '@/plugins/core/hooks/use-text-lang';
import { classNameDrawerQuickMenu } from '../drawer';

interface Props {
  navIcons: { icon: React.ReactNode; id: number }[];
}

export const NavDrawerQuickMenu = ({ navIcons }: Props) => {
  const { nav, session } = useSession();
  const [activeItems, setActiveItems] = React.useState<string[]>([]);
  const { convertText } = useTextLang();

  if (nav.length === 0) return null;

  return (
    <Accordion.Root
      type="multiple"
      defaultValue={activeItems}
      className={cn('flex flex-col px-2', {
        'pb-5': !session,
      })}
    >
      {nav.map(item => {
        if (item.children.length > 0) {
          return (
            <Accordion.Item key={item.id} value={item.id.toString()}>
              <Accordion.Trigger
                className={cn(
                  buttonVariants({
                    variant: 'ghost',
                    className: cn(classNameDrawerQuickMenu, 'focus:bg-inherit'),
                  }),
                )}
                onClick={() =>
                  setActiveItems(prev =>
                    prev.includes(item.id.toString())
                      ? prev.filter(el => el !== item.id.toString())
                      : [...prev, item.id.toString()],
                  )
                }
              >
                {item.icon
                  ? navIcons.find(el => el.id === item.id)?.icon
                  : null}
                <span>{convertText(item.name)}</span>
                <ChevronDown
                  className={cn(
                    'ml-auto h-5 w-5 flex-shrink-0 transition-transform',
                    {
                      'rotate-180 transform': activeItems.includes(
                        item.id.toString(),
                      ),
                    },
                  )}
                />
              </Accordion.Trigger>

              <Accordion.Content className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden transition-all">
                <div className="pl-5">
                  {item.children.map(child => (
                    <ItemNavDrawerQuickMenu key={child.id} {...child}>
                      <div className="[&>svg]:text-muted-foreground flex items-center gap-2">
                        {child.icon
                          ? navIcons.find(el => el.id === child.id)?.icon
                          : null}
                        <span>{convertText(child.name)}</span>
                      </div>
                      {child.description.length > 0 && (
                        <span className="text-muted-foreground text-sm leading-none">
                          {convertText(child.description)}
                        </span>
                      )}
                    </ItemNavDrawerQuickMenu>
                  ))}
                </div>
              </Accordion.Content>
            </Accordion.Item>
          );
        }

        return (
          <ItemNavDrawerQuickMenu key={item.id} {...item}>
            {item.icon ? navIcons.find(el => el.id === item.id)?.icon : null}
            <span>{convertText(item.name)}</span>
            {item.description.length > 0 && (
              <span className="text-muted-foreground text-sm leading-none">
                {convertText(item.description)}
              </span>
            )}
          </ItemNavDrawerQuickMenu>
        );
      })}

      <Separator className="my-2" />
    </Accordion.Root>
  );
};
