import * as React from 'react';

import { ShowCoreLanguages } from '../../../../../../../../graphql/code';
import {
  Dialog,
  DialogContent,
} from '../../../../../../../../components/ui/dialog';
import { Loader } from '../../../../../../../../components/ui/loader';

const Content = React.lazy(async () =>
  import('./content').then(module => ({
    default: module.ContentUpdateActionsTableLangsCoreAdmin,
  })),
);

interface Props extends Pick<ShowCoreLanguages, 'code' | 'name'> {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export const UpdateActionsTableLangsCoreAdmin = ({
  open,
  setOpen,
  ...props
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <React.Suspense fallback={<Loader />}>
          <Content {...props} />
        </React.Suspense>
      </DialogContent>
    </Dialog>
  );
};
