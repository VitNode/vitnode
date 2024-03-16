import { useTranslations } from "next-intl";

import { DateFormat } from "@/components/date-format/date-format";
import type { ShowTopicsForums } from "@/graphql/hooks";
import { useTextLang } from "@/hooks/core/use-text-lang";
import { Link } from "@/i18n";
import { WrapperItemTopicListForum } from "./wrapper-item";

export interface ItemTopicListForumProps
  extends Pick<ShowTopicsForums, "title" | "user" | "id" | "created"> {}

export const ItemTopicListForum = ({
  created,
  id,
  title,
  user
}: ItemTopicListForumProps) => {
  const t = useTranslations("forum");
  const { convertNameToLink, convertText } = useTextLang();
  const href = `/forum/topic/${convertNameToLink({ id, name: title })}`;

  return (
    <WrapperItemTopicListForum
      href={href}
      className="px-6 py-4 hover:bg-muted/50 cursor-pointer select-none md:select-auto"
    >
      <div className="flex flex-col">
        <h3 className="font-semibold text-base">
          <Link
            href={href}
            className="text-foreground no-underline break-words"
          >
            {convertText(title)}
          </Link>
        </h3>
        <span className="text-sm text-muted-foreground">
          {t.rich("by", {
            user: () => (
              <Link href={`/profile/${user.name_seo}`}>{user.name}</Link>
            ),
            date: () => <DateFormat date={created} />
          })}
        </span>
      </div>
    </WrapperItemTopicListForum>
  );
};
