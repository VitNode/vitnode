import { TabsTrigger, TabsTriggerProps } from './trigger-tabs';

import { cx } from '../../functions/classnames';

interface Props {
  items: Omit<TabsTriggerProps, 'className'>[];
  className?: string;
}

export const Tabs = ({ className, items }: Props) => {
  return (
    <div className={cx('flex', className)}>
      <div className="h-14 rounded-md bg-card p-2 text-muted-foreground flex overflow-x-auto">
        {items.map(el => (
          <TabsTrigger key={el.href} {...el} />
        ))}
      </div>
    </div>
  );
};
