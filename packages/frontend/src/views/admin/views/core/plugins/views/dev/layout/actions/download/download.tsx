import { Download } from 'lucide-react';
import { useTranslations } from 'next-intl';
import * as React from 'react';

import { ShowAdminPlugins } from '../../../../../../../../../../graphql/code';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '../../../../../../../../../../components/ui/dialog';
import { Button } from '../../../../../../../../../../components/ui/button';
import { Loader } from '../../../../../../../../../../components/ui/loader';

const Content = React.lazy(async () =>
  import('./content').then(module => ({
    default: module.ContentDownloadActionDevPluginAdmin,
  })),
);

export const DownloadActionDevPluginAdmin = (props: ShowAdminPlugins) => {
  const t = useTranslations('core');

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Download /> {t('download')}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-xl">
        <React.Suspense fallback={<Loader />}>
          <Content {...props} />
        </React.Suspense>
      </DialogContent>
    </Dialog>
  );
};
