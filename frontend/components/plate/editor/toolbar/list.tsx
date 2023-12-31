import { ListStyleType } from '@udecode/plate-indent-list';
import { List, ListOrdered } from 'lucide-react';

import { ToggleGroup } from '@/components/ui/toolbar';
import { IndentButton } from './Indent-button';

export const ListToolbarEditor = () => {
  return (
    <ToggleGroup type="single">
      <IndentButton nodeType={ListStyleType.Disc}>
        <List />
      </IndentButton>
      <IndentButton nodeType={ListStyleType.Decimal}>
        <ListOrdered />
      </IndentButton>
    </ToggleGroup>
  );
};
