import type { ShowCoreNav } from '@/graphql/hooks';
import { DeleteActionTableNavAdmin } from './delete/delete';

export const ActionsTableNavAdmin = (props: Pick<ShowCoreNav, 'id' | 'children' | 'name'>) => {
  return (
    <>
      <DeleteActionTableNavAdmin {...props} />
    </>
  );
};
