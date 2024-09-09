import { ShowCoreLanguages } from '@/graphql/types';
import React from 'react';

import { DeleteActionsTableLangsCoreAdmin } from './delete/delete';
import { EditActionsTableLangsCoreAdmin } from './edit';

export const ActionsTableLangsCoreAdmin = (data: ShowCoreLanguages) => {
  return (
    <>
      <EditActionsTableLangsCoreAdmin {...data} />
      {!data.protected && !data.default && (
        <DeleteActionsTableLangsCoreAdmin {...data} />
      )}
    </>
  );
};
