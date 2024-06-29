import { useTextLang } from 'vitnode-frontend/hooks/use-text-lang';

import { ShowBlogCategories } from '@/utils/hooks';

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
