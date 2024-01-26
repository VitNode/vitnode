import { useState, useMemo } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { DndContext, DragOverlay, defaultDropAnimationSideEffects } from '@dnd-kit/core';
import { useQueryClient, type InfiniteData } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

import { ItemContentTablePluginsAdmin } from './item';
import { usePluginsAdminAPI } from '../hooks/use-plugins-admin-api';
import type { Core_Plugins__Admin__ShowQuery } from '@/graphql/hooks';
import { APIKeys } from '@/graphql/api-keys';
import { Loader } from '@/components/loader/loader';
import { ErrorAdminView } from '@/admin/core/global/error-admin-view';
import { mutationChangePositionApi } from '../hooks/mutation-change-position-api';

export const ContentTablePluginsAdmin = () => {
  const t = useTranslations('core');
  const { data, isError, isLoading } = usePluginsAdminAPI();
  const queryClient = useQueryClient();
  const [active, setActive] = useState<number | null>(null);

  const sortedIds = useMemo(() => data.map(({ id }) => id), [data]);

  if (isLoading) return <Loader />;
  if (isError) return <ErrorAdminView />;
  if (!data || data.length === 0) return <div className="text-center">{t('no_results')}</div>;

  return (
    <DndContext
      onDragStart={({ active }) => {
        const findIndex = data.findIndex(item => item.id === active.id);

        setActive(findIndex);
      }}
      onDragCancel={() => {
        setActive(null);
      }}
      onDragEnd={async ({ active, over }) => {
        const findOverIndex = data.findIndex(item => item.id === over?.id);
        const activeItemIndex = data.findIndex(item => item.id === active.id);
        if (activeItemIndex === findOverIndex) return;

        queryClient.setQueryData<InfiniteData<Core_Plugins__Admin__ShowQuery>>(
          [APIKeys.PLUGINS],
          old => {
            if (!old) return old;

            const parsePages = old.pages.flatMap(page => page.core_plugins__admin__show);
            const pageInfo = parsePages.at(-1)?.pageInfo;
            if (!pageInfo) return old;
            const newEdges = arrayMove(data, activeItemIndex, findOverIndex);

            return {
              pages: [
                {
                  core_plugins__admin__show: {
                    edges: newEdges.map((item, index) => ({ ...item, position: index })),
                    pageInfo
                  }
                }
              ],
              pageParams: [old.pageParams.at(-1)]
            };
          }
        );

        setActive(null);

        await mutationChangePositionApi({
          id: Number(active.id),
          indexToMove: findOverIndex
        });
      }}
    >
      <SortableContext items={sortedIds} strategy={verticalListSortingStrategy}>
        <Virtuoso
          useWindowScroll
          overscan={200}
          data={data}
          itemContent={(_index, data) => <ItemContentTablePluginsAdmin key={data.id} data={data} />}
        />
      </SortableContext>
      <DragOverlay
        dropAnimation={{
          sideEffects: defaultDropAnimationSideEffects({
            styles: {
              active: {
                opacity: '0.5'
              }
            }
          })
        }}
      >
        {active !== null && (
          <ItemContentTablePluginsAdmin key={data[active].id} data={data[active]} />
        )}
      </DragOverlay>
    </DndContext>
  );
};
