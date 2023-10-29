'use client';

import { Cpu, Users } from 'lucide-react';
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
  const [activeItem, setActiveItem] = useState(segments.at(0) ?? 'core');

  return (
    <Accordion.Root
      type="single"
      defaultValue={activeItem}
      className={cx('flex flex-col gap-2', className)}
    >
      <ItemListNavAdmin
        id="core"
        icon={Cpu}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        onClickItem={onClickItem}
        items={[
          {
            id: 'dashboard',
            href: ''
          },
          {
            id: 'general',
            href: '/general'
          },
          {
            id: 'email',
            href: '/email'
          },
          {
            id: 'webapp',
            href: '/webapp'
          },
          {
            id: 'langs',
            href: '/langs'
          }
        ]}
      />
      <ItemListNavAdmin
        id="users"
        icon={Users}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        onClickItem={onClickItem}
        items={[
          {
            id: 'list',
            href: ''
          },
          {
            id: 'groups',
            href: '/groups'
          }
        ]}
      />
      {children}
    </Accordion.Root>
  );
};
