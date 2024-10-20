'use client';

import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { cn } from '@/helpers/classnames';
import { Link } from '@/navigation';
import { AlertTriangle, Home, SearchX, ShieldX } from 'lucide-react';
import { useTranslations } from 'next-intl';

export interface ErrorViewProps {
  className?: string;
  code: '403' | '404' | '500';
}

export const ErrorView = ({ className, code }: ErrorViewProps) => {
  const t = useTranslations('core.global.errors');

  return (
    <div className={cn('mx-auto my-10 max-w-2xl px-4', className)}>
      <Card>
        <CardHeader className="items-center pb-2">
          {(() => {
            switch (code) {
              case '403':
                return <ShieldX className="size-16" />;
              case '404':
                return <SearchX className="size-16" />;
              default:
                return <AlertTriangle className="size-16" />;
            }
          })()}
        </CardHeader>
        <CardContent className="flex flex-col items-center pb-4 text-center">
          <span className="text-muted-foreground">{t('title')}</span>
          <p className="mt-1 text-xl font-semibold tracking-tight">{t(code)}</p>
        </CardContent>

        <CardFooter className="justify-center">
          <Link className={buttonVariants({ variant: 'outline' })} href="/">
            <Home className="size-5" /> {t('actions.back_home')}
          </Link>
        </CardFooter>
      </Card>
      <div className="text-muted-foreground pt-2 text-right italic">
        {t.rich('code', {
          code: () => (
            <span className="font-semibold">{code.toLocaleLowerCase()}</span>
          ),
        })}
      </div>
    </div>
  );
};
