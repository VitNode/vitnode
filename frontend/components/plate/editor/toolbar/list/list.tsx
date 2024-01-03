import { ListStyleType } from '@udecode/plate-indent-list';
import { List, ListOrdered } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { IndentButton } from '../list/Indent-button';

export const ListToolbarEditor = () => {
  const t = useTranslations('core.editor.list');

  return (
    <>
      <IndentButton nodeType={ListStyleType.Disc} tooltip={t('bullet')}>
        <List />
      </IndentButton>

      <IndentButton nodeType={ListStyleType.Decimal} tooltip={t('number')}>
        <ListOrdered />
      </IndentButton>
    </>
  );
};
