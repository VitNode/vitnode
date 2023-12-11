import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from '@/i18n';
import { cx } from '@/functions/classnames';

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
            <Link href="#">
              <h2 className="font-semibold text-lg">Test {index}</h2>
            </Link>
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
              <div className="p-6">
                <div>Test 123 {index}</div>
                <div>Test 123 {index}</div>
                <div>Test 123 {index}</div>
                <div>Test 123 {index}</div>
                <div>Test 123 {index}</div>
                <div>Test 123 {index}</div>
                <div>Test 123 {index}</div>
                <div>Test 123 {index}</div>
                <div>Test 123 {index}</div>
                <div>Test 123 {index}</div>
                <div>Test 123 {index}</div>
                <div>Test 123 {index}</div>
                <div>Test 123 {index}</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};
