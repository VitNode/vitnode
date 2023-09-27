import { LucideIcon, ChevronDown } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import * as Accordion from '@radix-ui/react-accordion';

import { buttonVariants } from '@/components/ui/button';
import { cx } from '@/functions/classnames';
import { LinkItemListNavAdmin } from './link/link-item-list-nav-admin';

interface Props {
  activeItem: string;
  icon: LucideIcon;
  id: string;
  setActiveItem: Dispatch<SetStateAction<string>>;
  title: string;
  defaultActive?: boolean;
}

export const ItemListNavAdmin = ({ activeItem, icon, id, setActiveItem, title }: Props) => {
  const Icon = icon;

  return (
    <Accordion.Item value={id}>
      <Accordion.Header>
        <Accordion.Trigger
          className={cx(
            'w-full justify-start flex gap-2',
            buttonVariants({ variant: id === activeItem ? 'secondary' : 'ghost' })
          )}
          onClick={() => setActiveItem(id)}
        >
          <Icon className="w-5 h-5" />
          <span>{title}</span>
          <ChevronDown
            className={cx('w-5 h-5 ml-auto transition-transform', {
              'transform rotate-180': id === activeItem
            })}
          />
        </Accordion.Trigger>
      </Accordion.Header>

      <Accordion.Content className="transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden">
        <ul className="p-2">
          <LinkItemListNavAdmin href="/admin" text="Dashboard" />
          <LinkItemListNavAdmin href="/admin/general" text="General" />
          <LinkItemListNavAdmin href="/admin/email" text="Email" />
          <LinkItemListNavAdmin href="/admin/webapp" text="Web App" />
        </ul>
      </Accordion.Content>
    </Accordion.Item>
  );
};
