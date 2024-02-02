import { WifiOff } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { PoweredByVitNode } from './powered-by';
import '@/app/[locale]/(apps)/(admin)/admin/global.scss';

interface Props {
  showPoweredBy?: boolean;
}

export const InternalErrorView = ({ showPoweredBy }: Props) => {
  const t = useTranslations('core');

  return (
    <div className="mx-auto max-w-2xl px-4 my-10">
      <Card>
        <CardHeader className="items-center pb-2">
          <WifiOff className="w-16 h-16" />
        </CardHeader>
        <CardContent className="flex flex-col items-center text-center pb-4">
          <span className="text-muted-foreground">{t('errors.title')}</span>

          <p className="text-xl font-semibold tracking-tight mt-1">
            {t('errors.no_connection_api')}
          </p>
        </CardContent>
      </Card>
      <div className="text-right pt-2 text-muted-foreground italic">
        {t.rich('errors.code', {
          code: () => <span className="font-semibold">{500}</span>
        })}
      </div>

      {showPoweredBy && (
        <footer className="text-center p-5 text-sm">
          <PoweredByVitNode className="text-muted-foreground no-underline" />
        </footer>
      )}
    </div>
  );
};
