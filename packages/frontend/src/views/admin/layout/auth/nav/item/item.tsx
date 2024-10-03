import { useTranslations } from 'next-intl';

import { TextAndIconsAsideAdmin } from '../../../admin-layout';
import { ItemItemNavAdminProps, LinkItemNavAdmin } from './link';

export const ItemNavAdmin = ({
  id,
  items,
  textsAndIcons,
}: {
  id: string;
  items: ItemItemNavAdminProps[];
  textsAndIcons: TextAndIconsAsideAdmin[];
}) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const t = useTranslations(`admin_${id}.nav`);

  return (
    <>
      {id !== 'core' && (
        <div className="mb-2 mt-8 px-2 font-medium first:mt-0">
          {t('title')}
        </div>
      )}

      <div className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden transition-all">
        <ul className="space-y-1">
          {items.map(item => (
            <li key={item.id}>
              <LinkItemNavAdmin
                key={item.id}
                plugin_code={id}
                textsAndIcons={textsAndIcons}
                {...item}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
