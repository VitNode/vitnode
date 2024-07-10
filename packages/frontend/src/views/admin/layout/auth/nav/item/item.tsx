import { useTranslations } from 'next-intl';

import { ItemItemNavAdminProps, LinkItemNavAdmin } from './link';

import { Icon } from '@/components/icon/icon';

interface Props {
  id: string;
  items: ItemItemNavAdminProps[];
  onClickItem?: () => void;
}

export const ItemNavAdmin = ({ id, items }: Props) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const t = useTranslations(`${id}.admin`);

  return (
    <>
      {id !== 'core' && (
        <div className="mb-2 mt-8 px-2 font-medium first:mt-0">
          {t('nav.title')}
        </div>
      )}

      <div className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden transition-all">
        <ul className="space-y-1">
          {items.map(item => (
            <li key={item.id}>
              <LinkItemNavAdmin
                key={item.id}
                primaryId={id}
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
