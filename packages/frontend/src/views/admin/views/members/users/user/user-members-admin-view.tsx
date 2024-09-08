import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AvatarUser } from '@/components/ui/user/avatar';
import { GroupFormat } from '@/components/ui/user/group-format';
import { fetcher } from '@/graphql/fetcher';
import {
  Admin__Core_Members__Show__Item,
  Admin__Core_Members__Show__ItemQuery,
  Admin__Core_Members__Show__ItemQueryVariables,
} from '@/graphql/queries/admin/members/users/item/admin__core_members__show__item.generated';
import { Link } from '@/navigation';
import { SquareArrowOutUpRight } from 'lucide-react';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { ActionsUserMembersAdmin } from './actions/actions';
import { InfoBlockUserMembersAdmin } from './blocks/info';

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
  const [
    t,
    {
      admin__core_members__show: { edges },
    },
  ] = await Promise.all([
    getTranslations('admin.members.users.item'),
    getData({ id }),
  ]);

  if (edges.length === 0) {
    return notFound();
  }

  const { name, group, joined, email, name_seo } = edges[0];

  return (
    <div className="space-y-8">
      <Card className="@container">
        <div className="bg-secondary h-20 rounded-t-md" />
        <div className="@lg:flex-row @lg:text-left @lg:mt-0 relative -mt-14 flex flex-col items-center gap-6 p-4 text-center">
          <div className="basis-24">
            <AvatarUser
              className="border-card @lg:bottom-4 @lg:left-auto @lg:translate-x-0 absolute bottom-auto left-1/2 -mb-2 -translate-x-1/2 border-4"
              sizeInRem={6}
              user={edges[0]}
            />
          </div>

          <div className="flex-1">
            <h1 className="truncate text-2xl font-semibold">{name}</h1>
            <GroupFormat group={group} />
          </div>

          <Button asChild variant="outline">
            <Link href={`/profile/${name_seo}`} target="_blank">
              {t('public_profile')} <SquareArrowOutUpRight />
            </Link>
          </Button>

          <ActionsUserMembersAdmin {...edges[0]} />
        </div>
      </Card>

      <InfoBlockUserMembersAdmin email={email} joined={joined} />
    </div>
  );
};
