import { DeleteActionTableNavAdmin } from './delete/delete';
import { EditActionTableNavAdmin } from './edit';
import { ShowCoreNav } from '@/graphql/graphql';

export const ActionsTableNavAdmin = (props: ShowCoreNav) => {
  return (
    <div className="flex gap-1">
      <EditActionTableNavAdmin {...props} />
      <DeleteActionTableNavAdmin {...props} />
    </div>
  );
};
