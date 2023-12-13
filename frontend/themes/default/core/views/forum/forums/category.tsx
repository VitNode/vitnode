import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from '@/i18n';
import { cx } from '@/functions/classnames';
import { ItemForum, ItemForumProps } from './item';
import { TextLanguage } from '@/graphql/hooks';
import { useTextLang } from '@/hooks/core/use-text-lang';
import { ReadOnlyEditor } from '@/components/editor/read-only/read-only-editor';

interface Props {
  description: TextLanguage[];
  id: string;
  name: TextLanguage[];
  children?: ItemForumProps[] | null;
}

export const CategoryForum = ({ children, description, id, name }: Props) => {
  const [isClose, setClose] = useState(false);
  const { convertText } = useTextLang();

  return (
    <Card>
      <CardContent className="p-0">
        <div
          className={cx('px-6 py-4 flex items-center gap-4 justify-between', {
            'border-b': !isClose && children && children.length > 0
          })}
        >
          <div>
            <h2 className="font-medium text-xl">
              <Link href={`/forum/${id}`} className="text-foreground no-underline">
                {convertText(name)}
              </Link>
            </h2>

            {description.length > 0 && (
              <p className="text-muted-foreground text-sm [&_p]:m-0">
                <ReadOnlyEditor id={`${id}_description`} value={description} />
              </p>
            )}
          </div>

          <Button
            className="transition-transform text-muted-foreground hover:text-foreground flex-shrink-0"
            variant="ghost"
            size="icon"
            onClick={() => setClose(prev => !prev)}
          >
            <ChevronDown
              className={cx('transition-transform', {
                'transform rotate-90': isClose
              })}
            />
          </Button>
        </div>

        <AnimatePresence initial={false}>
          {!isClose && children && children.length > 0 && (
            <motion.div
              key="content"
              initial="collapsed"
              animate="open"
              exit="collapsed"
              variants={{
                open: { opacity: 1, height: 'auto' },
                collapsed: { opacity: 0, height: 0 }
              }}
            >
              {children.map(child => (
                <ItemForum key={child.id} {...child} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};
