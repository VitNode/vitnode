import { DateFormat } from '@/components/date-format';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { TooltipWrapper } from '@/components/ui/tooltip';
import { Admin__Core_Members__Show__ItemQuery } from '@/graphql/queries/admin/members/users/item/admin__core_members__show__item.generated';
import { AtSign, MailWarning, UserPlus } from 'lucide-react';
import { useTranslations } from 'next-intl';

export const InfoBlockUserMembersAdmin = ({
  email,
  joined,
  email_verified,
}: Pick<
  Admin__Core_Members__Show__ItemQuery['admin__core_members__show']['edges'][0],
  'email' | 'email_verified' | 'joined'
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

            <div className="flex items-center gap-2">
              <span>{email}</span>
              {!email_verified && (
                <TooltipWrapper
                  content={t('not_email_verified')}
                  delayDuration={0}
                >
                  <MailWarning className="text-destructive size-5" />
                </TooltipWrapper>
              )}
            </div>
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
