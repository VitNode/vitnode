import React from 'react';

import { EditActionItemPermissionsAdminDevPluginAdmin } from './edit';

export const ActionsItemPermissionsAdminDevPluginAdmin = (
  props: React.ComponentProps<
    typeof EditActionItemPermissionsAdminDevPluginAdmin
  >,
) => {
  return (
    <div className="ml-auto">
      <EditActionItemPermissionsAdminDevPluginAdmin {...props} />
    </div>
  );
};
