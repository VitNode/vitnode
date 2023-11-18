import { cx } from '@/functions/classnames';
import { Link } from '@/i18n';

export interface TabsTriggerProps {
  id: string;
  text: string;
  active?: boolean;
  className?: string;
  href?: string;
  onClick?: () => void;
}

export const TabsTrigger = ({ active, className, href, onClick, text }: TabsTriggerProps) => {
  const currentClassName = cx(
    'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-4 py-2.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm flex-shrink-0',
    className
  );
  const dataState = active ? 'active' : 'inactive';

  if (href) {
    return (
      <Link href={href} data-state={dataState} className={currentClassName} onClick={onClick}>
        {text}
      </Link>
    );
  }

  return (
    <button type="button" data-state={dataState} className={currentClassName} onClick={onClick}>
      {text}
    </button>
  );
};
