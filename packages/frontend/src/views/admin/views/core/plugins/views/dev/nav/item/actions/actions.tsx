import { Admin__Core_Plugins__Nav__ShowQuery } from '@/graphql/queries/admin/plugins/dev/nav/admin__core_plugins__nav__show.generated';

import { ItemContentNavDevPluginAdmin } from '../item';
import { DeleteActionTableNavDevPluginAdmin } from './delete/delete';
import { EditActionTableNavDevPluginAdmin } from './edit';

export const ActionsTableNavDevPluginAdmin = ({
  data,
  parentId,
  icons,
  dataFromSSR,
}: {
  dataFromSSR: Admin__Core_Plugins__Nav__ShowQuery['admin__core_plugins__nav__show'];
} & React.ComponentProps<typeof ItemContentNavDevPluginAdmin>) => {
  return (
    <div className="flex gap-1">
      <EditActionTableNavDevPluginAdmin
        data={data}
        dataFromSSR={dataFromSSR}
        icons={icons}
      />
      <DeleteActionTableNavDevPluginAdmin {...data} parentId={parentId} />
    </div>
  );
};
