import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ChevronRight, GripVertical } from 'lucide-react';
import React from 'react';

import { cn } from '../helpers/classnames';
import { Button } from './ui/button';

interface Props {
  active: boolean;
  children: React.ReactNode;
  id: number | string;
  isDropHere: boolean;
  onCollapse: () => void;
  childrenLength?: number;
  className?: string;
  depth?: number;
  indentationWidth?: number;
  isOpenChildren?: boolean;
}

export const ItemDragAndDrop = ({
  active,
  children,
  childrenLength,
  depth = 0,
  id,
  indentationWidth = 0,
  isDropHere,
  isOpenChildren,
  onCollapse,
  className,
}: Props) => {
  const {
    attributes,
    isDragging,
    listeners,
    setDraggableNodeRef,
    setDroppableNodeRef,
    transform,
    transition,
  } = useSortable({
    id,
    animateLayoutChanges: ({ isSorting, wasDragging }) =>
      !(isSorting || wasDragging),
  });

  const allowOpenChildren = !!(childrenLength && onCollapse);

  return (
    <div
      ref={setDroppableNodeRef}
      className={cn(
        'rounded-lg pl-[var(--spacing)] transition-all [&:not(:first-child)]:mt-4',
        className,
      )}
      style={
        {
          '--spacing': `${indentationWidth * depth}px`,
        } as React.CSSProperties
      }
    >
      <div
        className={cn(
          'bg-card border-input relative flex flex-wrap items-center gap-2 rounded-lg border p-4 transition-shadow sm:gap-4',
          {
            'bg-primary/20 animate-pulse': isDropHere,
            'z-10 opacity-50': isDragging,
            'shadow-lg': active,
          },
        )}
        style={{
          transform: CSS.Transform.toString(transform),
          transition,
        }}
        ref={setDraggableNodeRef}
      >
        <div className="flex shrink-0 gap-2">
          <Button
            className={cn('w-8')}
            variant="ghost"
            size="icon"
            ariaLabel=""
            {...attributes}
            {...listeners}
          >
            <GripVertical />
          </Button>

          {allowOpenChildren && (
            <Button
              onClick={onCollapse}
              variant="ghost"
              size="icon"
              ariaLabel=""
            >
              <ChevronRight
                className={cn('text-muted-foreground transition-transform', {
                  'rotate-90': isOpenChildren,
                })}
              />
            </Button>
          )}
        </div>

        {children}
      </div>
    </div>
  );
};
