import { Star } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useFormStatus } from 'react-dom';

import { TooltipTrigger } from '../../../../../../../../components/ui/tooltip';
import { Button } from '../../../../../../../../components/ui/button';

export const ButtonSetDefaultPluginActionsAdmin = () => {
  const t = useTranslations('admin.core.plugins');
  const { pending } = useFormStatus();

  return (
    <TooltipTrigger asChild>
      <Button
        variant="ghost"
        type="submit"
        size="icon"
        ariaLabel={t('set_default')}
        loading={pending}
      >
        <Star />
      </Button>
    </TooltipTrigger>
  );
};
