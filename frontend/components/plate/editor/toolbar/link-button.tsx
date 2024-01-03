import { useLinkToolbarButton, useLinkToolbarButtonState } from '@udecode/plate-link';
import { Link } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { ToolbarButton } from '@/components/plate-ui/toolbar';

export const LinkToolbarEditor = () => {
  const t = useTranslations('core.editor.link');
  const state = useLinkToolbarButtonState();
  const { props } = useLinkToolbarButton(state);

  return (
    <ToolbarButton tooltip={t('title')} {...props}>
      <Link />
    </ToolbarButton>
  );
};
