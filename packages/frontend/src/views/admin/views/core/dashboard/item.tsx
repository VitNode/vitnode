import { Button } from '@/components/ui/button';
import { cn } from '@/helpers/classnames';
import { UniqueIdentifier } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';

export const SortableTreeItem = ({
  childCount,
  clone,
  depth,
  indentationWidth,
  collapsed,
  value,
  className,
  id,
  ...props
}: {
  childCount?: number;
  clone?: boolean;
  collapsed?: boolean;
  depth: number;
  id: UniqueIdentifier;
  indentationWidth: number;
  value: UniqueIdentifier;
} & Omit<React.HTMLAttributes<HTMLLIElement>, 'id' | 'style'>) => {
  const {
    attributes,
    // isDragging,
    isSorting,
    listeners,
    setDraggableNodeRef,
    setDroppableNodeRef,
    transform,
    transition,
  } = useSortable({
    id,
    animateLayoutChanges: ({ isSorting, wasDragging }) =>
      isSorting || wasDragging ? false : true,
  });

  return (
    <li
      className={cn('-mb-[1px] list-none pl-[var(--spacing)]', className, {
        'pointer-events-none inline-block p-0 pl-[10px] pt-[5px]': clone,
        'pointer-events-none': isSorting,
      })}
      ref={setDroppableNodeRef}
      style={
        {
          '--spacing': `${indentationWidth * depth}px`,
        } as React.CSSProperties
      }
      {...props}
    >
      <div
        className={cn(
          'bg-card relative flex items-center border px-[10px] py-[var(--vertical-padding)]',
          {
            'rounded-sm pr-[24px] shadow': clone,
          },
        )}
        ref={setDraggableNodeRef}
        style={
          {
            transform: CSS.Translate.toString(transform),
            transition,
            '--vertical-padding': clone ? '5px' : '10px',
          } as React.CSSProperties
        }
      >
        <Button
          ariaLabel=""
          className={cn('w-8 cursor-grab')}
          size="icon"
          variant="ghost"
          {...attributes}
          {...listeners}
        >
          <GripVertical />
        </Button>
        <div>test123</div>
        {clone && childCount && childCount > 1 ? (
          <span className="bg-primary text-primary-foreground absolute -right-[10px] -top-[10px] flex size-[24px] items-center justify-center rounded-full text-sm">
            {childCount}
          </span>
        ) : null}
      </div>
    </li>
  );
};
