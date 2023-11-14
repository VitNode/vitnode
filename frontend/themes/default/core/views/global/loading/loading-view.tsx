import { useTranslations } from 'next-intl';

import { Card, CardHeader } from '@/components/ui/card';
import { Loader } from '@/components/loader/loader';
import { cx } from '@/functions/classnames';

interface Props {
  className?: string;
  global?: boolean;
}

export const LoadingView = ({ className, global }: Props) => {
  const t = useTranslations('core');

  const content = (
    <Card>
      <CardHeader className="gap-2 items-center text-center">
        {t('loading')} <Loader />
      </CardHeader>
    </Card>
  );

  if (global) return <div className={cx('mx-auto max-w-sm', className)}>{content}</div>;

  return content;
};
