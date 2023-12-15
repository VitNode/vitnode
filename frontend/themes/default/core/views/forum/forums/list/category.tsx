import { ChevronDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from '@/i18n';
import { cx } from '@/functions/classnames';
import { ItemForum, ItemForumProps } from '../item/item-forum';
import { TextLanguage } from '@/graphql/hooks';
import { useTextLang } from '@/hooks/core/use-text-lang';
import { DescriptionItemForum } from '../item/description';

interface Props {
  description: TextLanguage[];
  id: string;
  name: TextLanguage[];
  children?: ItemForumProps[] | null;
}

export const CategoryForum = ({ children, description, id, name }: Props) => {
  const { convertNameToLink, convertText } = useTextLang();

  return (
    <Card>
      <CardContent className="p-0">
        <div
          className={cx('px-6 py-4 flex items-center gap-4 justify-between', {
            //  'border-b': children && children.length > 0
          })}
        >
          <div>
            <Link
              href={`/forum/${convertNameToLink({ id, name })}`}
              className="font-medium text-xl text-foreground no-underline"
            >
              {convertText(name)}
            </Link>

            {description.length > 0 && <DescriptionItemForum id={id} description={description} />}
          </div>

          {children && children.length > 0 && (
            <Button
              className="transition-transform text-muted-foreground hover:text-foreground flex-shrink-0"
              variant="ghost"
              size="icon"
              // onClick={() => setClose(prev => !prev)}
            >
              <ChevronDown
                className={cx('transition-transform', {
                  //  'transform rotate-90': isClose
                })}
              />
            </Button>
          )}
        </div>

        {/* <AnimatePresence initial={false}> */}
        {/* {!isClose && children && children.length > 0 && ( */}
        {children &&
          children.length > 0 &&
          children.map(child => <ItemForum key={child.id} {...child} />)}
        {/* </AnimatePresence> */}
      </CardContent>
    </Card>
  );
};
