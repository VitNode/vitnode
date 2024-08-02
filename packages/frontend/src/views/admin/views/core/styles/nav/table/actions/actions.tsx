import { ShowCoreNav } from '@/graphql/types';
import { DeleteActionTableNavAdmin } from './delete/delete';
import { EditActionTableNavAdmin } from './edit';

export const ActionsTableNavAdmin = (props: ShowCoreNav) => {
  return (
    <div className="flex gap-1">
      <EditActionTableNavAdmin {...props} />
      <DeleteActionTableNavAdmin {...props} />
    </div>
  );
};
