import { useTranslations } from 'next-intl';

import { CardContent } from '@/components/ui/card';

export const InstallConfigsView = () => {
  const t = useTranslations('admin.configs.install');

  return (
    <CardContent>
      <div>{t('steps.step_1.text', { name: 'VitNode' })}</div>
    </CardContent>
  );
};
