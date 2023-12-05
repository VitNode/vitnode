import { ChevronRight, Menu, User } from 'lucide-react';
import { CSSProperties } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { UniqueIdentifier } from '@dnd-kit/core';

import { Button } from '@/components/ui/button';
import { useTextLang } from '@/hooks/core/use-text-lang';
import { cx } from '@/functions/classnames';
import { Show_Forum_ForumsQueryFlattenedItem } from './content-table';
import { useChildrenForumForumsAdminAPI } from '../hooks/use-children-forum-forums-admin-api';
import { GlobalLoader } from '@/components/loader/global/global-loader';

interface Props extends Show_Forum_ForumsQueryFlattenedItem {
  indentationWidth: number;
  onCollapse?: (id: UniqueIdentifier) => void;
}

export const ItemTableForumsForumAdmin = ({
  _count: { children: childrenCount },
  depth,
  id,
  indentationWidth,
  isOpenChildren,
  name,
  onCollapse
}: Props) => {
  const { convertText } = useTextLang();
  const { attributes, listeners, setDraggableNodeRef, setDroppableNodeRef, transform, transition } =
    useSortable({
      id,
      animateLayoutChanges: ({ isSorting, wasDragging }) =>
        isSorting || wasDragging ? false : true
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
