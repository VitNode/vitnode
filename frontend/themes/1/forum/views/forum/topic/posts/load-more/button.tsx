import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";

interface Props {
  count: number;
  fetchNextPage: () => void;
  isFetching: boolean;
}

export const ButtonLoadMorePosts = ({
  count,
  fetchNextPage,
  isFetching
}: Props): JSX.Element => {
  const t = useTranslations("forum.topics");

  return (
    <div className="relative py-5">
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t-4 border-dashed" />
      </div>

      <div className="relative flex justify-center">
        <Button
          variant="outline"
          size="sm"
          onClick={fetchNextPage}
          loading={isFetching}
        >
          {t("load_more_comments", { count })}
        </Button>
      </div>
    </div>
  );
};
