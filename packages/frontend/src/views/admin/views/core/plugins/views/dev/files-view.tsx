import { fetcher } from '@/graphql/fetcher';
import {
  Admin__Core_Plugins__Files,
  Admin__Core_Plugins__FilesQuery,
  Admin__Core_Plugins__FilesQueryVariables,
} from '@/graphql/queries/admin/plugins/dev/admin__core_plugins__files.generated';
import { cn } from '@/helpers/classnames';
import { getTranslations } from 'next-intl/server';

const getData = async (variables: Admin__Core_Plugins__FilesQueryVariables) => {
  const data = await fetcher<
    Admin__Core_Plugins__FilesQuery,
    Admin__Core_Plugins__FilesQueryVariables
  >({
    query: Admin__Core_Plugins__Files,
    variables,
  });

  return data;
};

export interface FilesDevPluginAdminViewProps {
  params: { code: string };
}

export const FilesDevPluginAdminView = async ({
  params: { code },
}: FilesDevPluginAdminViewProps) => {
  const [data, t] = await Promise.all([
    getData({ code }),
    getTranslations('admin.core.plugins.dev.files'),
  ]);

  return (
    <ul className="max-w-[40rem] rounded-md border [&>li:not(:last-child)]:border-b">
      {Object.entries(data.admin__core_plugins__files).map(item => (
        <li
          className="flex items-center justify-between gap-2 p-4"
          key={item[0]}
        >
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-expect-error */}
          {t(item[0])}

          <span
            className={cn('text-right text-sm', {
              'text-muted-foreground italic': !item[1],
              'text-primary font-semibold': item[1],
              'text-destructive font-semibold':
                !item[1] && item[0] === 'default_page',
            })}
          >
            {t('file_detected', { count: +item[1] })}
          </span>
        </li>
      ))}
    </ul>
  );
};
