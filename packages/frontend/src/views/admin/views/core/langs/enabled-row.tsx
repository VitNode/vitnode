import { useLocale, useTranslations } from 'next-intl';
import { toast } from 'sonner';
import * as React from 'react';

import { editMutationApi } from './create-edit/hooks/edit-mutation-api';

import { ShowCoreLanguages } from '../../../../../graphql/graphql';
import { Switch } from '../../../../../components/ui/switch';

interface Props {
  data: ShowCoreLanguages;
}

export const EnabledRowTableLangsCoreAdmin = ({ data }: Props) => {
  const locale = useLocale();
  const t = useTranslations('core');
  const [checked, changeChecked] = React.useOptimistic(data.enabled);

  return (
    <Switch
      disabled={data.default || data.protected || data.code === locale}
      checked={checked}
      onClick={async () => {
        changeChecked(!checked);
        const mutation = await editMutationApi({
          ...data,
          enabled: !data.enabled,
          time24: data.time_24,
          allowInInput: data.allow_in_input,
        });

        if (mutation.error) {
          toast.error(t('errors.title'), {
            description: t('errors.internal_server_error'),
          });
          changeChecked(!checked);

          return;
        }
      }}
    />
  );
};
