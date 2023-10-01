import { AlertTriangle } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ActionsError } from './actions/actions-error';

interface Props {
  code: '404' | '500' | string;
}

export const ErrorView = ({ code }: Props) => {
  const t = useTranslations('core');

  // TODO: Add RWD
  return (
    <div className="mx-auto max-w-2xl">
      <Card>
        <CardHeader className="items-center pb-2">
          <AlertTriangle className="w-16 h-16" />
        </CardHeader>
        <CardContent className="flex flex-col items-center text-center pb-4">
          <span className="text-muted-foreground">{t('errors.title')}</span>
          <p className="text-xl font-semibold tracking-tight mt-1">Test - {code}</p>
        </CardContent>

        <ActionsError />
      </Card>
      <div className="text-right pt-2 text-muted-foreground">
        {t.rich('errors.code', {
          code: () => <span className="font-semibold">{code}</span>
        })}
      </div>
    </div>
  );
};
