import { useTranslations } from "next-intl";

import { AvatarUser } from "@/components/user/avatar/avatar-user";
import { LastPostsShowForumForums } from "@/utils/graphql/hooks";
import { DateFormat } from "@/components/date-format/date-format";
import { UserLastPostItemForum } from "./user";
import { useTextLang } from "@/plugins/core/hooks/use-text-lang";
import { WrapperLastPostItemForum } from "./wrapper";
import { Link } from "@/utils/i18n";

interface Props {
  lastPosts: LastPostsShowForumForums[];
}

export const LastPostItemForum = ({ lastPosts }: Props) => {
  const t = useTranslations("forum");
  const { convertNameToLink, convertText } = useTextLang();

  if (lastPosts.length === 0) return null;
  const { created, topic, user } = lastPosts[0];

  const href = `/forum/topic/${convertNameToLink({ id: topic.id, name: topic.title })}`;

  return (
    <WrapperLastPostItemForum
      href={href}
      className="flex items-center gap-2 md:w-64"
    >
      <AvatarUser user={user} sizeInRem={2.25} />
      <div className="flex flex-1 flex-col justify-center overflow-hidden">
        <Link
          className="text-foreground hover:text-primary truncate leading-tight"
          href={href}
        >
          {convertText(topic.title)}
        </Link>
        <div className="text-muted-foreground text-sm">
          {t.rich("by", {
            user: () => <UserLastPostItemForum {...user} />,
            date: () => <DateFormat date={created} />
          })}
        </div>
      </div>
    </WrapperLastPostItemForum>
  );
};
