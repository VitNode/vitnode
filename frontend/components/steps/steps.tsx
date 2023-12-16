import { Check } from 'lucide-react';

import { cx } from '@/functions/classnames';
import { Link } from '@/i18n';

export interface ItemStepProps {
  id: string;
  title: string;
  checked?: boolean;
  description?: string;
  href?: string;
}

interface Props {
  items: ItemStepProps[];
  className?: string;
}

export const Steps = ({ className, items }: Props) => {
  if (items.length === 0) return null;

  return (
    <div className={className}>
      <ol className={cx('relative flex flex-col gap-6 border-l-2 ml-4')}>
        {items.map((item, index) => (
          <li key={item.id}>
            <span
              className={cx(
                'absolute flex items-center justify-center w-8 h-8 rounded-full -left-4 border-2 bg-background text-card-foreground font-bold',
                {
                  ['bg-primary text-white border-primary']: item.checked
                }
              )}
            >
              {item.checked ? <Check className="w-5 h-5" /> : index + 1}
            </span>
            <div className="ml-6">
              {item.href ? (
                <Link href={item.href} className="text-lg font-semibold">
                  {item.title}
                </Link>
              ) : (
                <span className="text-lg font-semibold">{item.title}</span>
              )}
              {item.description && (
                <p className="text-sm text-muted-foreground">{item.description}</p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};
