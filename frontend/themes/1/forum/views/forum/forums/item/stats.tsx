import { useTranslations } from "next-intl";

import type { ShowForumForumsCounts } from "@/graphql/hooks";

export const StatsItemForum = ({
  total_posts,
  total_topics
}: Pick<ShowForumForumsCounts, "total_posts" | "total_topics">) => {
  const t = useTranslations("forum");

  return (
    <div className="flex items-center md:justify-center md:w-32 gap-4 justify-start">
      <div className="flex md:flex-col text-center flex-row md:gap-0 gap-1 items-center justify-center">
        <span className="font-bold">{total_topics}</span>
        <span className="text-muted-foreground text-sm">
          {t("topics_title_count", { count: total_topics })}
        </span>
      </div>

      <div className="flex md:flex-col text-center flex-row md:gap-0 gap-1 items-center justify-center">
        <span className="font-bold">{total_posts}</span>
        <span className="text-muted-foreground text-sm">
          {t("posts_title_count", { count: total_posts })}
        </span>
      </div>
    </div>
  );
};
