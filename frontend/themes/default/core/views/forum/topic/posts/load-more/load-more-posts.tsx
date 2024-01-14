import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';

interface Props {
  count: number;
}

export const LoadMorePosts = ({ count }: Props) => {
  const t = useTranslations('forum.topics');

  return (
    <div className="relative py-5">
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t-4 border-dashed" />
      </div>

      <div className="relative flex justify-center">
        <Button variant="outline" size="sm">
          {t('load_more_comments', { count })}
        </Button>
      </div>
    </div>
  );
};
