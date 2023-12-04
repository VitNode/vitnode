import { ChevronRight, Menu, User } from 'lucide-react';
import { CSSProperties, useEffect, useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { Button } from '@/components/ui/button';
import { useTextLang } from '@/hooks/core/use-text-lang';
import { cx } from '@/functions/classnames';
import { Show_Forum_ForumsQueryFlattenedItem } from './content-table';

interface Props extends Show_Forum_ForumsQueryFlattenedItem {
  indentationWidth: number;
}

export const ItemTableForumsForumAdmin = ({
  _count: { children: childrenCount },
  depth,
  id,
  indentationWidth,
  name
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { convertText } = useTextLang();
  const {
    attributes,
    isDragging,
    listeners,
    setDraggableNodeRef,
    setDroppableNodeRef,
    transform,
    transition
  } = useSortable({
    id,
    animateLayoutChanges: ({ isSorting, wasDragging }) => (isSorting || wasDragging ? false : true)
  });

  useEffect(() => {
    if (isDragging && isOpen) {
      setIsOpen(false);
    }
  }, [isDragging]);

  return (
    <div
      ref={setDroppableNodeRef}
      className="pl-[var(--spacing)]"
      style={
        {
          '--spacing': `${indentationWidth * depth}px`
        } as CSSProperties
      }
      onClick={() => {
        if (childrenCount > 0) {
          setIsOpen(prev => !prev);
        }
      }}
      role={childrenCount > 0 ? 'button' : undefined}
      tabIndex={childrenCount > 0 ? 0 : -1}
      onKeyDown={e => {
        if (e.key === 'Enter' && childrenCount > 0) setIsOpen(prev => !prev);
      }}
    >
      <div
        className="p-4 flex gap-4 bg-card items-center transition-[background-color,opacity] relative"
        style={{
          transform: CSS.Transform.toString(transform),
          transition
        }}
        ref={setDraggableNodeRef}
      >
        <Menu
          className="sm:block hidden flex-shrink-0 focus:outline-none"
          {...attributes}
          {...listeners}
        />

        {childrenCount > 0 && (
          <ChevronRight
            className={cx('transition-transform', {
              'rotate-90': isOpen
            })}
          />
        )}

        <div className="flex-grow flex flex-col">
          <span>{convertText(name)}</span>
          {childrenCount > 0 && (
            <span className="text-sm text-muted-foreground">SubForums: {childrenCount}</span>
          )}
        </div>

        <div className="flex-shrink-0">
          <Button variant="ghost" size="icon">
            <User />
          </Button>
        </div>
      </div>
    </div>
  );
};
