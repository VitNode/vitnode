import { useTranslations } from 'next-intl';
import { CheckIcon } from 'lucide-react';

import { CommandGroup, CommandItem } from '@/components/ui/command';
import { cn } from '@/helpers/classnames';
import { GroupFormat } from '@/components/ui/user/group-format';
import { GroupInputItem } from '@/components/ui/user/group-input';
import { Admin__Core_Groups__Show_ShortQuery } from '@/graphql/graphql';

export const GroupInputContentList = ({
  edges,
  onSelect,
  values,
}: {
  edges: Admin__Core_Groups__Show_ShortQuery['admin__core_groups__show']['edges'];
  onSelect: (value: GroupInputItem) => void;
  values: GroupInputItem[];
  multiple?: boolean;
}) => {
  const t = useTranslations('core');

  if (edges.length === 0) {
    return <div className="py-6 text-center text-sm">{t('no_results')}</div>;
  }

  return (
    <CommandGroup>
      {edges
        .filter(item => !item.guest)
        .map(item => (
          <CommandItem
            className="gap-2"
            key={item.id}
            onSelect={() =>
              onSelect({
                id: item.id,
                name: item.name,
              })
            }
          >
            <div
              className={cn(
                'border-primary mr-2 flex size-4 items-center justify-center rounded-sm border',
                values.find(value => item.id === value.id)
                  ? 'bg-primary text-primary-foreground'
                  : 'opacity-50 [&_svg]:invisible',
              )}
            >
              <CheckIcon />
            </div>
            <GroupFormat group={item} />
          </CommandItem>
        ))}
    </CommandGroup>
  );
};
