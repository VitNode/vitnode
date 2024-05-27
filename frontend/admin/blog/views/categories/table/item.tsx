import { ShowBlogCategories } from "@/graphql/hooks";
import { useTextLang } from "@/hooks/core/use-text-lang";

interface Props {
  data: ShowBlogCategories;
}

export const ItemTableCategoriesCategoryAdmin = ({ data }: Props) => {
  const { convertText } = useTextLang();

  return (
    <>
      {convertText(data.name)} - {data.color}
    </>
  );
};
