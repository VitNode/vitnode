import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from '@/i18n';
import { cx } from '@/functions/classnames';
import { ItemForum } from './item';

interface Props {
  index: number;
}

export const CategoryForum = ({ index }: Props) => {
  const [isClose, setClose] = useState(false);

  return (
    <Card>
      <CardContent className="p-0">
        <div
          className={cx('px-6 py-4 flex items-start gap-4 justify-between', {
            'border-b': !isClose
          })}
        >
          <div>
            <h2 className="font-medium text-xl">
              <Link href="/forum/test" className="text-foreground no-underline">
                Test {index}
              </Link>
            </h2>

            <p className="text-muted-foreground text-sm">Test description {index}</p>
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
          {!isClose && (
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
              <ItemForum />
              <ItemForum />
              <ItemForum />
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};
