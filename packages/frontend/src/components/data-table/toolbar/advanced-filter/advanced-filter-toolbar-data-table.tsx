import { Filter } from 'lucide-react';
import React from 'react';
import { useTranslations } from 'next-intl';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../../../ui/sheet';
import { Button } from '../../../ui/button';
import { Loader } from '../../../ui/loader';

export const AdvancedFilterToolbarDataTable = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const t = useTranslations('core');

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="ml-auto"
          variant="outline"
          size="icon"
          ariaLabel={t('filters')}
        >
          <Filter />
        </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>{t('filters')}</SheetTitle>
        </SheetHeader>

        <React.Suspense fallback={<Loader />}>{children}</React.Suspense>
      </SheetContent>
    </Sheet>
  );
};
