import { Lock, Tag, Unlock, LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { DateFormat } from "@/components/date-format/date-format";
import { ShowPostsForumsMetaTags } from "@/graphql/hooks";
import { cn } from "@/functions/classnames";
import { UserLink } from "@/components/user/link/user-link";
import { DivMotion } from "@/components/animations/div-motion";

const icon: Record<string, LucideIcon> = {
  lock: Lock,
  unlock: Unlock
};

export const MetaTagTopic = ({
  action,
  action_id: id,
  created,
  user
}: Pick<
  ShowPostsForumsMetaTags,
  "action_id" | "action" | "created" | "user"
>) => {
  const t = useTranslations("forum.topics.actions.meta");
  const Icon = icon[action] ? icon[action] : Tag;

  return (
    <DivMotion
      key={`post_meta_tag_${id}`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="ml-2.5 flex gap-4 items-center"
      layout
    >
      <div
        className={cn(
          "border size-8 bg-border [&>svg]:size-4 flex items-center justify-center rounded-full",
          {
            "bg-destructive border-destructive text-white": action === "lock"
          }
        )}
      >
        <Icon />
      </div>

      <span className="text-muted-foreground">
        {t.rich(`meta_${action}`, {
          user: () => <UserLink user={user} />,
          date: () => <DateFormat date={created} />
        })}
      </span>
    </DivMotion>
  );
};
