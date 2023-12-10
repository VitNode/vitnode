import { TabsTrigger, TabsTriggerProps } from './trigger-tabs';
import { cx } from '@/functions/classnames';

interface Props {
  items: Omit<TabsTriggerProps, 'className'>[];
  className?: string;
}

export const Tabs = ({ className, items }: Props) => {
  return (
    <div className={cx('flex', className)}>
      <div className="flex rounded-md bg-background p-2 text-muted-foreground overflow-x-auto">
        {items.map(el => (
          <TabsTrigger key={el.id} {...el} />
        ))}
      </div>
    </div>
  );
};
