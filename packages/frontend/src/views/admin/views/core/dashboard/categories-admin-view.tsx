'use client';

import { DragAndDropSortableList } from '@/components/drag&drop/sortable-list/list';

export const CategoriesBlogAdminView = () => {
  const data = [
    {
      id: 'Home',
      children: [],
    },
    {
      id: 'Collections',
      children: [
        { id: 'Spring', children: [] },
        { id: 'Summer', children: [] },
        { id: 'Fall', children: [] },
        { id: 'Winter', children: [] },
      ],
    },
    {
      id: 'About Us',
      children: [],
    },
    {
      id: 'My Account',
      children: [
        { id: 'Addresses', children: [] },
        { id: 'Order History', children: [] },
      ],
    },
  ];

  return (
    <DragAndDropSortableList
      componentItem={data => {
        return <div>{data.id}</div>;
      }}
      data={data}
    />
  );
};
