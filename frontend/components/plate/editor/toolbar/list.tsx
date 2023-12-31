import { ListStyleType } from '@udecode/plate-indent-list';
import { List, ListOrdered } from 'lucide-react';

import { IndentButton } from './Indent-button';

export const ListToolbarEditor = () => {
  return (
    <>
      <IndentButton nodeType={ListStyleType.Disc}>
        <List />
      </IndentButton>

      <IndentButton nodeType={ListStyleType.Decimal}>
        <ListOrdered />
      </IndentButton>
    </>
  );
};
