import { useTranslations } from "next-intl";

import { SortingHeaderPosts } from "./sorting";

interface Props {
  totalComments: number;
}

export const HeaderPosts = ({ totalComments }: Props) => {
  const t = useTranslations("forum.topics");

  return (
    <div className="my-5 flex flex-wrap items-center justify-between gap-2">
      <div>{t("comments_count", { count: totalComments })}</div>

      <SortingHeaderPosts />
    </div>
  );
};
