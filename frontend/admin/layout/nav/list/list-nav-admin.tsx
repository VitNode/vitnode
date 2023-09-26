import { Brush, Cpu, Users } from 'lucide-react';

import { ItemListNavAdmin } from './item/item-list-nav-admin';

export const ListNavAdmin = () => {
  return (
    <ul>
      <ItemListNavAdmin icon={Cpu} title="Core" />
      <ItemListNavAdmin icon={Users} title="Users" />
      <ItemListNavAdmin icon={Brush} title="Themes" />
    </ul>
  );
};
