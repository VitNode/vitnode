import { Suspense, forwardRef, lazy } from 'react';
import { useTranslations } from 'next-intl';
import { Plus } from 'lucide-react';

import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import { Loader } from '../loader/loader';
import { IconDynamic } from '../icon-dynamic';
import type { IconDynamicNames } from '../icon-dynamic';
import { cx } from '@/functions/classnames';

const ContentIconPickInput = lazy(() =>
  import('./content-icon-pick-input').then(module => ({
    default: module.ContentIconPickInput
  }))
);

interface Props {
  onChange: (icon: IconDynamicNames) => void;
  value: string | null;
}

const IconPickerInput = forwardRef<HTMLButtonElement, Props>(({ onChange, value }, ref) => {
  const t = useTranslations('core');

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={cx('w-full justify-start', {
            ['text-muted-foreground']: !value
          })}
          ref={ref}
        >
          {value ? (
            <>
              <IconDynamic name={value as IconDynamicNames} />
              <span className="overflow-hidden whitespace-nowrap text-ellipsis">{value}</span>
            </>
          ) : (
            <>
              <Plus /> {t('icon_picker.title')}
            </>
          )}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-4xl">
        <Suspense fallback={<Loader />}>
          <ContentIconPickInput onChange={onChange} />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
});
IconPickerInput.displayName = 'IconPickerInput';

export { IconPickerInput };
