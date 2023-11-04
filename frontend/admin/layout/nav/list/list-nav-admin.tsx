'use client';

import { AtSign, Boxes, Cog, Languages, LayoutDashboard, ScreenShare, Users } from 'lucide-react';
import { ReactNode, useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { useSelectedLayoutSegments } from 'next/navigation';

import { ItemListNavAdmin } from './item/item-list-nav-admin';
import { cx } from '@/functions/classnames';

interface Props {
  children?: ReactNode;
  className?: string;
  onClickItem?: () => void;
}

export const ListNavAdmin = ({ children, className, onClickItem }: Props) => {
  const segments = useSelectedLayoutSegments();
  const [activeItems, setActiveItems] = useState([segments.at(0) ?? 'core']);

  return (
    <Accordion.Root
      type="multiple"
      defaultValue={activeItems}
      className={cx('flex flex-col', className)}
    >
      <ItemListNavAdmin
        id="core"
        activeItems={activeItems}
        setActiveItems={setActiveItems}
        onClickItem={onClickItem}
        items={[
          {
            id: 'dashboard',
            href: '',
            icon: LayoutDashboard
          },
          {
            id: 'general',
            href: '/general',
            icon: Cog
          },
          {
            id: 'email',
            href: '/email',
            icon: AtSign
          },
          {
            id: 'webapp',
            href: '/webapp',
            icon: ScreenShare
          },
          {
            id: 'langs',
            href: '/langs',
            icon: Languages
          }
        ]}
      />
      <ItemListNavAdmin
        id="users"
        activeItems={activeItems}
        setActiveItems={setActiveItems}
        onClickItem={onClickItem}
        items={[
          {
            id: 'list',
            href: '',
            icon: Users
          },
          {
            id: 'groups',
            href: '/groups',
            icon: Boxes
          }
        ]}
      />
      {children}
    </Accordion.Root>
  );
};
