import { ChevronRight, Menu, User } from 'lucide-react';
import { CSSProperties } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { UniqueIdentifier } from '@dnd-kit/core';

import { Button } from '@/components/ui/button';
import { useTextLang } from '@/hooks/core/use-text-lang';
import { cx } from '@/functions/classnames';
import { useChildrenForumForumsAdminAPI } from './hooks/use-children-forum-forums-admin-api';
import { GlobalLoader } from '@/components/loader/global/global-loader';
import { Show_Forum_ForumsQueryFlattenedItem } from '../types';

interface Props extends Show_Forum_ForumsQueryFlattenedItem {
  indentationWidth: number;
  isDropHere?: boolean;
  onCollapse?: (id: UniqueIdentifier) => void;
}

export const ItemTableForumsForumAdmin = ({
  _count: { children: childrenCount },
  depth,
  id,
  indentationWidth,
  isDropHere = false,
  isOpenChildren,
  name,
  onCollapse
}: Props) => {
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

  const { isLoading } = useChildrenForumForumsAdminAPI({
    parentId: id,
    enabled: childrenCount > 0 && isOpenChildren
  });

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
        if (childrenCount > 0) onCollapse?.(id);
      }}
      role={childrenCount > 0 ? 'button' : undefined}
      tabIndex={childrenCount > 0 ? 0 : -1}
      onKeyDown={e => {
        if (e.key === 'Enter' && childrenCount > 0) onCollapse?.(id);
      }}
    >
      {isLoading && <GlobalLoader />}
      <div
        className={cx(
          'p-2 flex gap-4 bg-card items-center transition-[background-color,opacity] relative border',
          {
            'animate-pulse bg-primary/20': isDropHere,
            'z-10': isDragging
          }
        )}
        style={{
          transform: CSS.Transform.toString(transform),
          transition
        }}
        ref={setDraggableNodeRef}
      >
        <Button
          className="sm:flex hidden flex-shrink-0 focus:outline-none text-muted-foreground hover:text-foreground"
          variant="ghost"
          size="icon"
          {...attributes}
          {...listeners}
        >
          <Menu />
        </Button>

        {childrenCount > 0 && (
          <ChevronRight
            className={cx('transition-transform text-muted-foreground', {
              'rotate-90': isOpenChildren
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
