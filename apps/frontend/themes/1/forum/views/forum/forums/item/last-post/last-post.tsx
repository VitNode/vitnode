import { useTranslations } from "next-intl";

import { AvatarUser } from "@/components/user/avatar/avatar-user";
import type { LastPostsShowForumForums } from "@/graphql/hooks";
import { DateFormat } from "@/components/date-format/date-format";
import { UserLastPostItemForum } from "./user";
import { useTextLang } from "@/hooks/core/use-text-lang";
import { WrapperLastPostItemForum } from "./wrapper";
import { Link } from "@/i18n";

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
      className="md:w-64 flex gap-2 items-center"
    >
      <AvatarUser user={user} sizeInRem={2.25} />
      <div className="flex flex-col overflow-hidden justify-center flex-1">
        <Link
          className="truncate text-foreground leading-tight hover:text-primary"
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
