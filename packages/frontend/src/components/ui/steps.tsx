import { Check } from 'lucide-react';

import { cn } from '../../helpers/classnames';
import { Link } from '../../navigation';

export interface ItemStepProps {
  checked?: boolean;
  component: React.ReactNode;
  description?: string;
  href?: string;
  id: string;
  title: string;
}

export const Steps = ({
  className,
  items,
}: {
  className?: string;
  items: ItemStepProps[];
}) => {
  if (items.length === 0) return null;

  return (
    <div className={className}>
      <ol className={cn('relative ml-4 flex flex-col gap-5 border-l-2')}>
        {items.map((item, index) => (
          <li key={item.id}>
            <span
              className={cn(
                'bg-background text-card-foreground absolute -left-4 flex h-8 w-8 items-center justify-center rounded-full border-2 font-bold',
                {
                  ['bg-primary border-primary text-white']: item.checked,
                },
              )}
            >
              {item.checked ? <Check className="size-5" /> : index + 1}
            </span>
            <div className="ml-6">
              {item.href ? (
                <Link className="text-lg font-semibold" href={item.href}>
                  {item.title}
                </Link>
              ) : (
                <span className="text-lg font-semibold">{item.title}</span>
              )}
              {item.description && (
                <p className="text-muted-foreground text-sm">
                  {item.description}
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};
