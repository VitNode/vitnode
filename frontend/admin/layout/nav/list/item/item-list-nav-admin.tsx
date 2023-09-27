import { LucideIcon, ChevronDown } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

import { Button } from '@/components/ui/button';
import { cx } from '@/functions/classnames';

interface Props {
  activeItem: string;
  icon: LucideIcon;
  id: string;
  setActiveItem: Dispatch<SetStateAction<string>>;
  title: string;
  defaultActive?: boolean;
}

export const ItemListNavAdmin = ({ activeItem, icon, id, setActiveItem, title }: Props) => {
  const Icon = icon;

  return (
    <li>
      <Button
        variant={id === activeItem ? 'secondary' : 'ghost'}
        className="w-full justify-start flex gap-2"
        onClick={() => setActiveItem(id)}
      >
        <Icon className="w-5 h-5" />
        <span>{title}</span>
        <ChevronDown
          className={cx('w-5 h-5 ml-auto transition-transform', {
            'transform rotate-180': id === activeItem
          })}
        />
      </Button>
    </li>
  );
};
