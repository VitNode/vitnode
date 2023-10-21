'use client';

import { Cpu, Users } from 'lucide-react';
import { useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';

import { ItemListNavAdmin } from './item/item-list-nav-admin';

export const ListNavAdmin = () => {
  const [activeItem, setActiveItem] = useState('core');

  return (
    <Accordion.Root type="single" defaultValue={activeItem} className="p-4 flex flex-col gap-2">
      <ItemListNavAdmin
        id="core"
        icon={Cpu}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
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
          }
        ]}
      />
      <ItemListNavAdmin
        id="users"
        icon={Users}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
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
    </Accordion.Root>
  );
};
