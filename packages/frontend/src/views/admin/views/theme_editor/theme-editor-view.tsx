import { ContentThemeEditor } from './content';
import {
  Core_Theme_Editor__Show,
  Core_Theme_Editor__ShowQuery,
  Core_Theme_Editor__ShowQueryVariables,
} from '@/graphql/graphql';
import { fetcher } from '@/graphql/fetcher';
import { getSessionData } from '@/graphql/get-session-data';

import { ErrorView } from '../../../theme/views/error/error-view';

const getData = async () => {
  const { data } = await fetcher<
    Core_Theme_Editor__ShowQuery,
    Core_Theme_Editor__ShowQueryVariables
  >({
    query: Core_Theme_Editor__Show,
  });

  return data;
};

export const ThemeEditorView = async () => {
  const [data, session] = await Promise.all([getData(), getSessionData()]);

  if (!session.core_sessions__authorization.user?.is_admin) {
    return <ErrorView code="403" />;
  }

  return <ContentThemeEditor {...data} />;
};
