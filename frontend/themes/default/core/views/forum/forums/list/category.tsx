import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from '@/i18n';
import { cx } from '@/functions/classnames';
import { ItemForum, ItemForumProps } from './item-forum';
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
  const { convertNameToLink, convertText } = useTextLang();

  return (
    <Card>
      <CardContent className="p-0">
        <div
          className={cx('px-6 py-4 flex items-center gap-4 justify-between', {
            'border-b': !isClose && children && children.length > 0
          })}
        >
          <div>
            <Link
              href={`/forum/${convertNameToLink({ id, name })}`}
              className="font-medium text-xl text-foreground no-underline"
            >
              {convertText(name)}
            </Link>

            <ReadOnlyEditor
              id={`${id}_description`}
              className="text-muted-foreground text-sm [&_p]:m-0"
              value={description}
            />
          </div>

          {children && children.length > 0 && (
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
          )}
        </div>

        <AnimatePresence initial={false}>
          {!isClose && children && children.length > 0 && (
            <motion.div
              key="content"
              initial="collapsed"
              animate="open"
              exit="collapsed"
              className="overflow-hidden"
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
