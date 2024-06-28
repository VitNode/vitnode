import { useTranslations } from 'next-intl';

import { ButtonSetDefaultPluginActionsAdmin } from './button';
import { useSetDefaultPluginAdmin } from './hooks/use-set-default-admin';

import { ShowAdminPlugins } from '../../../../../../../../graphql/code';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
} from '../../../../../../../../components/ui/tooltip';

export const SetDefaultPluginActionsAdmin = (props: ShowAdminPlugins) => {
  const t = useTranslations('admin.core.plugins');
  const { onSubmit } = useSetDefaultPluginAdmin(props);

  return (
    <form action={onSubmit}>
      <TooltipProvider>
        <Tooltip>
          <ButtonSetDefaultPluginActionsAdmin />
          <TooltipContent>{t('set_default')}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </form>
  );
};
