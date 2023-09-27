'use client';

import { Brush, Cpu, Users } from 'lucide-react';
import { useState } from 'react';

import { ItemListNavAdmin } from './item/item-list-nav-admin';

export const ListNavAdmin = () => {
  const [activeItem, setActiveItem] = useState('core');

  return (
    <ul className="p-2 flex flex-col gap-2">
      <ItemListNavAdmin
        id="core"
        icon={Cpu}
        title="Core"
        activeItem={activeItem}
        setActiveItem={setActiveItem}
      />
      <ItemListNavAdmin
        id="users"
        icon={Users}
        title="Users"
        activeItem={activeItem}
        setActiveItem={setActiveItem}
      />
      <ItemListNavAdmin
        id="themes"
        icon={Brush}
        title="Themes"
        activeItem={activeItem}
        setActiveItem={setActiveItem}
      />
    </ul>
  );
};
