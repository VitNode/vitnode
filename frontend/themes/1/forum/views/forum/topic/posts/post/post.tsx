import { useTranslations } from "next-intl";
import type { ReactNode } from "react";

import { AvatarUser } from "@/components/user/avatar/avatar-user";
import { UserLink } from "@/components/user/link/user-link";
import { DateFormat } from "@/components/date-format/date-format";
import { GroupFormat } from "@/components/groups/group-format";
import type { ShowPostsForums } from "@/graphql/hooks";
import { DivMotion } from "@/components/animations/div-motion";
import { ReadOnlyEditor } from "@/components/editor/read-only/read-only-editor";

interface Props
  extends Pick<ShowPostsForums, "content" | "created" | "post_id" | "user"> {
  customMoreMenu?: ReactNode;
  disableInitialAnimation?: boolean;
}

export const PostTopic = ({
  content,
  created,
  customMoreMenu,
  disableInitialAnimation,
  post_id: id,
  user
}: Props) => {
  const t = useTranslations("forum.topics");

  return (
    <DivMotion
      key={`post_${id}`}
      initial={disableInitialAnimation ? false : { opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="rounded-lg border bg-card text-card-foreground shadow-sm"
    >
      <div className="p-4 pb-0 flex gap-4 items-center">
        <div className="flex-1 flex gap-2 items-center">
          <AvatarUser sizeInRem={2} user={user} />
          <div className="flex flex-col leading-none">
            <div>
              {t.rich("username_format", {
                user: () => <UserLink className="font-semibold" user={user} />,
                group: () => (
                  <GroupFormat className="text-sm" group={user.group} />
                )
              })}
            </div>
            <DateFormat
              className="text-muted-foreground text-sm"
              date={created}
            />
          </div>
        </div>
        {customMoreMenu}
      </div>

      <div className="p-4">
        <ReadOnlyEditor id={`post_${id}`} value={content} />
      </div>
    </DivMotion>
  );
};
