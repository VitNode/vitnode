import { useTranslations } from "next-intl";

import { ShowForumForumsCounts } from "@/utils/graphql/hooks";

export const StatsItemForum = ({
  total_posts,
  total_topics
}: Pick<ShowForumForumsCounts, "total_posts" | "total_topics">) => {
  const t = useTranslations("forum");

  return (
    <div className="flex items-center justify-start gap-4 md:w-32 md:justify-center">
      <div className="flex flex-row items-center justify-center gap-1 text-center md:flex-col md:gap-0">
        <span className="font-bold">{total_topics}</span>
        <span className="text-muted-foreground text-sm">
          {t("topics_title_count", { count: total_topics })}
        </span>
      </div>

      <div className="flex flex-row items-center justify-center gap-1 text-center md:flex-col md:gap-0">
        <span className="font-bold">{total_posts}</span>
        <span className="text-muted-foreground text-sm">
          {t("posts_title_count", { count: total_posts })}
        </span>
      </div>
    </div>
  );
};
