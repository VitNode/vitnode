import { ChevronRight, Menu, User } from 'lucide-react';
import { useState } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { Button } from '@/components/ui/button';
import { ShowForumForumsWithParent } from '@/graphql/hooks';
import { useTextLang } from '@/hooks/core/use-text-lang';
import { cx } from '@/functions/classnames';

interface Props extends Omit<ShowForumForumsWithParent, 'parent'> {}

export const ItemTableForumsForumAdmin = ({
  _count: { children: childrenCount },
  id,
  name
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { convertText } = useTextLang();
  const { attributes, isDragging, listeners, setNodeRef, transform, transition } = useSortable({
    id
  });

  return (
    <>
      <div
        ref={setNodeRef}
        className={cx(
          'p-4 flex gap-4 bg-card items-center transition-[background-color,opacity] relative',
          {
            'animate-pulse bg-muted z-10': isDragging
          }
        )}
        style={{
          transform: CSS.Transform.toString(transform),
          transition
        }}
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

      {isOpen && (
        <Virtuoso useWindowScroll totalCount={10} itemContent={index => <div>index {index}</div>} />
      )}
    </>
  );
};
