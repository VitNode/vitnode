import { Link } from '@/i18n';
import { buttonVariants } from '../ui/button';

export interface TabsTriggerProps {
  id: string;
  text: string;
  active?: boolean;
  className?: string;
  href?: string;
  onClick?: () => void;
}

export const TabsTrigger = ({ active, className, href, onClick, text }: TabsTriggerProps) => {
  const dataState = active ? 'active' : 'inactive';

  if (href) {
    return (
      <Link
        href={href}
        data-state={dataState}
        className={buttonVariants({
          variant: active ? 'default' : 'ghost',
          className
        })}
        onClick={onClick}
      >
        {text}
      </Link>
    );
  }

  return (
    <button
      type="button"
      data-state={dataState}
      className={buttonVariants({
        variant: active ? 'default' : 'ghost',
        className
      })}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
