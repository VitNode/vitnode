import { ScrollArea } from '@/components/ui/scroll-area';
import { getSessionAdminData } from '@/graphql/get-session-admin-data';

import { TextAndIconsAsideAdmin } from '../../admin-layout';
import { ItemNavAdmin } from './item/item';
import { NavAdminWrapper } from './wrapper';

export const NavAdmin = async ({
  textsAndIcons,
}: {
  textsAndIcons: TextAndIconsAsideAdmin[];
}) => {
  const data = await getSessionAdminData();

  return (
    <ScrollArea className="flex-1">
      <div className="px-3 py-6">
        <NavAdminWrapper>
          {data.admin__nav__show.map(item => (
            <ItemNavAdmin
              id={item.code}
              items={item.nav.map(navItem => ({
                id: navItem.code,
                icon: navItem.icon ?? undefined,
                children: navItem.children?.map(child => ({
                  id: child.code,
                })),
              }))}
              key={item.code}
              textsAndIcons={textsAndIcons}
            />
          ))}
        </NavAdminWrapper>
      </div>
    </ScrollArea>
  );
};
