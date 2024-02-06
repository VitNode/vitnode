import { useTranslations } from "next-intl";

import { SortingHeaderPosts } from "./sorting";

interface Props {
  totalComments: number;
}

export const HeaderPosts = ({ totalComments }: Props) => {
  const t = useTranslations("forum.topics");

  return (
    <div className="my-5 flex gap-2 justify-between items-center flex-wrap">
      <div>{t("comments_count", { count: totalComments })}</div>

      <SortingHeaderPosts />
    </div>
  );
};
