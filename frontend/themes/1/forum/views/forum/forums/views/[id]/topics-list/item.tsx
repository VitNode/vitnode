import { useTranslations } from "next-intl";

import { DateFormat } from "@/components/date-format/date-format";
import { ShowTopicsForums } from "@/utils/graphql/hooks";
import { useTextLang } from "@/plugins/core/hooks/use-text-lang";
import { Link } from "@/utils/i18n";
import { WrapperItemTopicListForum } from "./wrapper-item";

export interface ItemTopicListForumProps
  extends Pick<ShowTopicsForums, "created" | "id" | "title" | "user"> {}

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
      className="hover:bg-muted/50 cursor-pointer select-none px-6 py-4 md:select-auto"
    >
      <div className="flex flex-col">
        <h3 className="text-base font-semibold">
          <Link
            href={href}
            className="text-foreground break-words no-underline"
          >
            {convertText(title)}
          </Link>
        </h3>
        <span className="text-muted-foreground text-sm">
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
