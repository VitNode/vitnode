import { useTranslations } from 'next-intl';

import { Card, CardHeader } from '@/components/ui/card';
import { Loader } from '@/components/loader/loader';

interface Props {
  global?: boolean;
}

export const LoadingView = ({ global }: Props) => {
  const t = useTranslations('core');

  const content = (
    <Card>
      <CardHeader className="gap-2 items-center text-center">
        {t('loading')} <Loader />
      </CardHeader>
    </Card>
  );

  if (global) return <div className="mx-auto max-w-sm">{content}</div>;

  return content;
};
