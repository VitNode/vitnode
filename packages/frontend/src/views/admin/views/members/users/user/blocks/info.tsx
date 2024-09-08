import { DateFormat } from '@/components/date-format';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Admin__Core_Members__Show__ItemQuery } from '@/graphql/queries/admin/members/users/item/admin__core_members__show__item.generated';
import { AtSign, UserPlus } from 'lucide-react';
import { useTranslations } from 'next-intl';

export const InfoBlockUserMembersAdmin = ({
  email,
  joined,
}: Pick<
  Admin__Core_Members__Show__ItemQuery['admin__core_members__show']['edges'][0],
  'email' | 'joined'
>) => {
  const t = useTranslations('admin.members.users.item.info');

  return (
    <Card className="max-w-sm">
      <CardHeader>
        <h2 className="text-xl font-semibold leading-none tracking-tight">
          {t('title')}
        </h2>
      </CardHeader>

      <CardContent>
        <ul className="space-y-2">
          <li className="[&>svg]:text-muted-foreground [&>*:last-child]:text-muted-foreground relative flex items-center gap-4 pl-6 [&>*:last-child]:ml-auto [&>*:last-child]:break-all [&>*:last-child]:text-right [&>svg]:absolute [&>svg]:left-0 [&>svg]:top-1/2 [&>svg]:size-4 [&>svg]:-translate-y-1/2">
            <AtSign />
            <span>{t('email')}</span>

            <span>{email}</span>
          </li>

          <li className="[&>svg]:text-muted-foreground [&>*:last-child]:text-muted-foreground relative flex items-center gap-4 pl-6 [&>*:last-child]:ml-auto [&>*:last-child]:break-all [&>*:last-child]:text-right [&>svg]:absolute [&>svg]:left-0 [&>svg]:top-1/2 [&>svg]:size-4 [&>svg]:-translate-y-1/2">
            <UserPlus />
            <span>{t('joined')}</span>

            <DateFormat date={joined} />
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};
