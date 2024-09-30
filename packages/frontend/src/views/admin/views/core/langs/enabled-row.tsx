import { Switch } from '@/components/ui/switch';
import { ShowCoreLanguages } from '@/graphql/types';
import { useLocale, useTranslations } from 'next-intl';
import React from 'react';
import { toast } from 'sonner';

import { editMutationApi } from './create-edit/hooks/edit-mutation-api';

export const EnabledRowTableLangsCoreAdmin = ({
  data,
}: {
  data: ShowCoreLanguages;
}) => {
  const locale = useLocale();
  const t = useTranslations('core.global.errors');
  const [checked, changeChecked] = React.useOptimistic(data.enabled);

  return (
    <Switch
      checked={checked}
      disabled={data.default || data.protected || data.code === locale}
      onClick={async () => {
        changeChecked(!checked);

        try {
          await editMutationApi({
            ...data,
            enabled: !data.enabled,
            time24: data.time_24,
            allowInInput: data.allow_in_input,
          });
        } catch (_) {
          toast.error(t('title'), {
            description: t('internal_server_error'),
          });
          changeChecked(!checked);
        }
      }}
    />
  );
};
