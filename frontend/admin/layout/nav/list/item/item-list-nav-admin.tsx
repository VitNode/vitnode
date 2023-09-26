import { LucideIcon } from 'lucide-react';

interface Props {
  icon: LucideIcon;
  title: string;
}

export const ItemListNavAdmin = ({ icon, title }: Props) => {
  const Icon = icon;

  return (
    <li className="group">
      <button
        type="button"
        className="flex h-16 items-center gap-2 px-3 w-full py-2 text-sm font-medium justify-center transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
      >
        <Icon className="w-6 h-6" />
      </button>

      <div className="fixed top-16 left-16 hidden group-hover:block bg-card h-screen w-[16rem]">
        {title}
      </div>
    </li>
  );
};
