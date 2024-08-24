import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ChevronRight, GripVertical } from 'lucide-react';
import React from 'react';

import { cn } from '../helpers/classnames';
import { Button } from './ui/button';

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
}: {
  active: boolean;
  children: React.ReactNode;
  childrenLength?: number;
  className?: string;
  depth?: number;
  id: number | string;
  indentationWidth?: number;
  isDropHere: boolean;
  isOpenChildren?: boolean;
  onCollapse: () => void;
}) => {
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
      className={cn(
        'rounded-lg pl-[var(--spacing)] transition-all [&:not(:first-child)]:mt-2',
        className,
      )}
      ref={setDroppableNodeRef}
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
        ref={setDraggableNodeRef}
        style={{
          transform: CSS.Transform.toString(transform),
          transition,
        }}
      >
        <div className="flex shrink-0 gap-2">
          <Button
            ariaLabel=""
            className={cn('w-8')}
            size="icon"
            variant="ghost"
            {...attributes}
            {...listeners}
          >
            <GripVertical />
          </Button>

          {allowOpenChildren && (
            <Button
              ariaLabel=""
              onClick={onCollapse}
              size="icon"
              variant="ghost"
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
