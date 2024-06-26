import { useTranslations } from 'next-intl';
import { Icon } from 'vitnode-frontend/components/icon/icon';

import { ItemItemNavAdminProps, LinkItemNavAdmin } from './link';

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
    <div>
      {id !== 'core' && (
        <div className="text-muted-foreground px-4 text-sm">
          {t('nav.title')}
        </div>
      )}

      <div className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden transition-all">
        <ul className="space-y-1 py-2">
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
    </div>
  );
};
