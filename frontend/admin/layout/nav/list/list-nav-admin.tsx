'use client';

import {
  Group,
  Languages,
  LayoutDashboard,
  MessagesSquare,
  Settings,
  UserCog,
  Users
} from 'lucide-react';
import type { ReactNode } from 'react';
import { useState } from 'react';
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
            href: '/dashboard',
            icon: LayoutDashboard
          },
          {
            id: 'general',
            href: '/general',
            icon: Settings
          },
          {
            id: 'langs',
            href: '/langs',
            icon: Languages
          }
        ]}
      />
      <ItemListNavAdmin
        id="members"
        activeItems={activeItems}
        setActiveItems={setActiveItems}
        onClickItem={onClickItem}
        items={[
          {
            id: 'list',
            href: '/users',
            icon: Users
          },
          {
            id: 'groups',
            href: '/groups',
            icon: Group
          },
          {
            id: 'staff',
            href: '/staff',
            icon: UserCog
          }
        ]}
      />
      <ItemListNavAdmin
        id="forum"
        activeItems={activeItems}
        setActiveItems={setActiveItems}
        onClickItem={onClickItem}
        items={[
          {
            id: 'forums',
            href: '/forums',
            icon: MessagesSquare
          }
        ]}
      />
      {children}
    </Accordion.Root>
  );
};
