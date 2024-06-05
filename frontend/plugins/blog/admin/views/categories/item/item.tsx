import { ShowBlogCategories } from "@/utils/graphql/hooks";
import { useTextLang } from "@/plugins/core/hooks/use-text-lang";

interface Props {
  data: ShowBlogCategories;
}

export const ItemCategoriesCategoryAdmin = ({ data }: Props) => {
  const { convertText } = useTextLang();

  return (
    <>
      {convertText(data.name)} - {data.color}
    </>
  );
};
