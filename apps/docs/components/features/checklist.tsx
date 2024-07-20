import { Check } from 'lucide-react';

export interface ChecklistFeaturesProps {
  list: { id: number; text: React.ReactNode }[];
}

export const ChecklistFeatures = ({ list }: ChecklistFeaturesProps) => {
  return (
    <ul className="mt-6 space-y-2 lg:text-lg">
      {list.map(item => (
        <li key={item.id} className="flex items-center gap-2">
          <Check className="size-4 flex-shrink-0" /> <span>{item.text}</span>
        </li>
      ))}
    </ul>
  );
};
