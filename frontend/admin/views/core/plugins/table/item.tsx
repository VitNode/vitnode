import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Menu } from 'lucide-react';

import type { ShowAdminPlugins } from '@/graphql/hooks';
import { cx } from '@/functions/classnames';
import { Button } from '@/components/ui/button';

interface Props {
  data: ShowAdminPlugins;
}

export const ItemContentTablePluginsAdmin = ({ data: { author, id, name, version } }: Props) => {
  const { attributes, isDragging, listeners, setNodeRef, transform, transition } = useSortable({
    id,
    animateLayoutChanges: ({ isSorting, wasDragging }) => (isSorting || wasDragging ? false : true)
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Translate.toString(transform),
        transition
      }}
      className={cx(
        'p-4 flex gap-4 bg-card items-center transition-[background-color,opacity] relative border',
        {
          'opacity-50': isDragging
        }
      )}
    >
      <Button
        className="sm:flex hidden flex-shrink-0 focus:outline-none text-muted-foreground hover:text-foreground cursor-grab"
        variant="ghost"
        size="icon"
        tooltip=""
        {...attributes}
        {...listeners}
      >
        <Menu />
      </Button>

      <div className="flex flex-col">
        <div className="flex gap-2 items-center">
          <span className="font-semibold">{name}</span>
          <span className="text-muted-foreground text-sm">{version}</span>
        </div>
        <span className="text-muted-foreground text-sm">Description</span>
        <span className="text-muted-foreground text-sm">Author: {author}</span>
      </div>
    </div>
  );
};
