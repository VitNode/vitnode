import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Loader } from '@/components/ui/loader';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ShowAdminPlugins } from '@/graphql/types';
import { Upload } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

export const UploadPluginActionsAdmin = (
  props: Pick<ShowAdminPlugins, 'code' | 'name'>,
) => {
  const t = useTranslations('core');

  const Content = React.lazy(async () =>
    import('../../upload/upload').then(module => ({
      default: module.UploadPluginAdmin,
    })),
  );

  return (
    <Dialog>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button
                ariaLabel={t('upload_new_version')}
                size="icon"
                variant="ghost"
              >
                <Upload />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>{t('upload_new_version')}</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DialogContent className="max-w-xl">
        <React.Suspense fallback={<Loader />}>
          <Content data={props} />
        </React.Suspense>
      </DialogContent>
    </Dialog>
  );
};
