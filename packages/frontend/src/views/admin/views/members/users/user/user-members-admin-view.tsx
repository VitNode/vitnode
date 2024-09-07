import { Card } from '@/components/ui/card';
import { AvatarUser } from '@/components/ui/user/avatar';
import { GroupFormat } from '@/components/ui/user/group-format';
import { fetcher } from '@/graphql/fetcher';
import {
  Admin__Core_Members__Show__Item,
  Admin__Core_Members__Show__ItemQuery,
  Admin__Core_Members__Show__ItemQueryVariables,
} from '@/graphql/queries/admin/members/users/item/admin__core_members__show__item.generated';
import { notFound } from 'next/navigation';

const getData = async (
  variables: Admin__Core_Members__Show__ItemQueryVariables,
) => {
  const data = await fetcher<
    Admin__Core_Members__Show__ItemQuery,
    Admin__Core_Members__Show__ItemQueryVariables
  >({
    query: Admin__Core_Members__Show__Item,
    variables,
  });

  return data;
};

interface Props {
  id: number;
}

export const generateMetadataUserMembersAdmin = async ({ id }: Props) => {
  const data = await getData({ id });

  if (data.admin__core_members__show.edges.length === 0) {
    return {};
  }

  const { name } = data.admin__core_members__show.edges[0];

  return {
    title: name,
  };
};

export const UserMembersAdminView = async ({ id }: Props) => {
  const {
    admin__core_members__show: { edges },
  } = await getData({ id });

  if (edges.length === 0) {
    return notFound();
  }

  const { name, group } = edges[0];

  return (
    <Card className="max-w-xl">
      <div className="bg-secondary h-20 rounded-t-md" />
      <div className="-mt-14 flex items-end gap-6 p-6">
        <AvatarUser sizeInRem={6} user={edges[0]} />

        <div className="flex-1">
          <h1 className="truncate text-2xl font-semibold">{name}</h1>
          <GroupFormat group={group} />
        </div>
      </div>
    </Card>
  );
};
