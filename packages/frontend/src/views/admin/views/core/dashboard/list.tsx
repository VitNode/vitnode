'use client';

import {
  closestCenter,
  defaultDropAnimation,
  DndContext,
  DragEndEvent,
  DragMoveEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  MeasuringStrategy,
  UniqueIdentifier,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React, { useEffect, useId, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

import { SortableTreeItem } from './item';
import { FlattenedItem, TreeItem } from './types';
import {
  buildTree,
  flattenTree,
  getChildCount,
  getProjection,
  removeChildrenOf,
  setProperty,
} from './utilities';

const indentationWidth = 50;

export function DragAndDropSortableList<T extends TreeItem<T>>({
  data,
  componentItem,
}: {
  componentItem: (item: Omit<FlattenedItem<T>, 'children'>) => React.ReactNode;
  data: T[];
}) {
  const [isReadyDocument, setIsReadyDocument] = useState(false);
  const [items, setItems] = useState(data);
  const [activeId, setActiveId] = useState<null | UniqueIdentifier>(null);
  const [overId, setOverId] = useState<null | UniqueIdentifier>(null);
  const [offsetLeft, setOffsetLeft] = useState(0);
  const [currentPosition, setCurrentPosition] = useState<{
    overId: UniqueIdentifier;
    parentId: null | UniqueIdentifier;
  } | null>(null);
  const id = useId();

  // Refetch data
  useEffect(() => {
    setItems(data);
  }, [data]);

  const flattenedItems = useMemo(() => {
    const flattenedTree = flattenTree(items);
    const collapsedItems = flattenedTree.reduce<UniqueIdentifier[]>(
      (acc, { children, collapsed, id }) =>
        collapsed && children.length ? [...acc, id] : acc,
      [],
    );

    return removeChildrenOf(
      flattenedTree,
      activeId ? [activeId, ...collapsedItems] : collapsedItems,
    );
  }, [activeId, items]);

  const projected =
    activeId && overId
      ? getProjection(
          flattenedItems,
          activeId,
          overId,
          offsetLeft,
          indentationWidth,
        )
      : null;
  const activeItem = activeId
    ? flattenedItems.find(({ id }) => id === activeId)
    : null;

  const sortedIds = useMemo(
    () => flattenedItems.map(({ id }) => id),
    [flattenedItems],
  );

  function handleDragStart({ active: { id: activeId } }: DragStartEvent) {
    setActiveId(activeId);
    setOverId(activeId);

    const activeItem = flattenedItems.find(({ id }) => id === activeId);

    if (activeItem) {
      setCurrentPosition({
        parentId: activeItem.parentId,
        overId: activeId,
      });
    }

    document.body.style.setProperty('cursor', 'grabbing');
  }

  function handleDragMove({ delta }: DragMoveEvent) {
    setOffsetLeft(delta.x);
  }

  function handleDragOver({ over }: DragOverEvent) {
    setOverId(over?.id ?? null);
  }

  function resetState() {
    setOverId(null);
    setActiveId(null);
    setOffsetLeft(0);
    setCurrentPosition(null);

    document.body.style.setProperty('cursor', '');
  }

  function handleDragEnd({ active, over }: DragEndEvent) {
    resetState();

    if (projected && over) {
      const { depth, parentId } = projected;
      const clonedItems: FlattenedItem<T>[] = JSON.parse(
        JSON.stringify(flattenTree(items)),
      );
      const overIndex = clonedItems.findIndex(({ id }) => id === over.id);
      const activeIndex = clonedItems.findIndex(({ id }) => id === active.id);
      const activeTreeItem = clonedItems[activeIndex];

      clonedItems[activeIndex] = { ...activeTreeItem, depth, parentId };

      const sortedItems = arrayMove(clonedItems, activeIndex, overIndex);
      const newItems = buildTree<T>(sortedItems);

      setItems(newItems);
    }
  }

  function handleDragCancel() {
    resetState();
  }

  function handleCollapse(id: UniqueIdentifier) {
    const newItems = setProperty<T>(items, id, 'collapsed', value => {
      if (value === undefined) {
        return false;
      }

      return !value;
    });

    setItems(newItems);
  }

  useEffect(() => {
    setIsReadyDocument(true);
  }, []);

  return (
    <DndContext
      collisionDetection={closestCenter}
      id={id}
      measuring={{
        droppable: {
          strategy: MeasuringStrategy.Always,
        },
      }}
      onDragCancel={handleDragCancel}
      onDragEnd={handleDragEnd}
      onDragMove={handleDragMove}
      onDragOver={handleDragOver}
      onDragStart={handleDragStart}
    >
      <SortableContext items={sortedIds} strategy={verticalListSortingStrategy}>
        {flattenedItems.map(({ id, children, collapsed, depth, ...rest }) => (
          <SortableTreeItem<T>
            collapsed={Boolean(collapsed && children.length)}
            depth={id === activeId && projected ? projected.depth : depth}
            id={id}
            indentationWidth={indentationWidth}
            key={id}
            onCollapse={
              children.length
                ? () => {
                    handleCollapse(id);
                  }
                : undefined
            }
          >
            {componentItem({ ...rest, id, depth })}
          </SortableTreeItem>
        ))}
        {isReadyDocument &&
          createPortal(
            <DragOverlay
              dropAnimation={{
                keyframes({ transform }) {
                  return [
                    {
                      opacity: 1,
                      transform: CSS.Transform.toString(transform.initial),
                    },
                    {
                      opacity: 0,
                      transform: CSS.Transform.toString({
                        ...transform.final,
                        x: transform.final.x + 5,
                        y: transform.final.y + 5,
                      }),
                    },
                  ];
                },
                easing: 'ease-out',
                sideEffects({ active }) {
                  active.node.animate([{ opacity: 0 }, { opacity: 1 }], {
                    duration: defaultDropAnimation.duration,
                    easing: defaultDropAnimation.easing,
                  });
                },
              }}
            >
              {activeId && activeItem ? (
                <SortableTreeItem
                  childCount={getChildCount(items, activeId) + 1}
                  clone
                  depth={activeItem.depth}
                  id={activeId}
                  indentationWidth={indentationWidth}
                >
                  {componentItem(activeItem)}
                </SortableTreeItem>
              ) : null}
            </DragOverlay>,
            document.body,
          )}
      </SortableContext>
    </DndContext>
  );
}
