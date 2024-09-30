import { Icon } from '@/components/icon/icon';
import { useTranslations } from 'next-intl';

import { ItemItemNavAdminProps, LinkItemNavAdmin } from './link';

export const ItemNavAdmin = ({
  id,
  items,
}: {
  id: string;
  items: ItemItemNavAdminProps[];
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
                i18n={{
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-expect-error
                  title: t(item.id),
                  children: item.children?.map(child => ({
                    id: child.id,
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    title: t(`${item.id}_${child.id}`),
                  })),
                }}
                key={item.id}
                plugin_code={id}
                {...item}
                icons={[
                  {
                    id: item.id,
                    icon: item.icon ? <Icon name={item.icon} /> : null,
                  },
                ]}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
