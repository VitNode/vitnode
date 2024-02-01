import { useSortable } from '@dnd-kit/sortable';
import { Menu } from 'lucide-react';
import { CSS } from '@dnd-kit/utilities';

import { cx } from '@/functions/classnames';
import { Button } from '@/components/ui/button';

interface Props {
  depth: boolean;
  id: number;
  isDropHere: boolean;
  name: string;
}

export const ItemContentTableContentNavAdmin = ({ depth, id, isDropHere, name }: Props) => {
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
          'opacity-50 z-10': isDragging,
          [`ml-5`]: depth,
          'animate-pulse bg-primary/20': isDropHere
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

      <div className="flex flex-col flex-1">
        <div className="flex gap-2 items-center">
          <span className="font-semibold">
            {name} - {depth && 'children'}
          </span>
        </div>

        <span className="text-muted-foreground text-sm line-clamp-2">desc</span>
      </div>

      <div>actions</div>
    </div>
  );
};
