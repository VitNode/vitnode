import { Check } from "lucide-react";
import { Link } from "@vitnode/frontend/navigation";

import { cn } from "@/functions/classnames";

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
      <ol className={cn("relative ml-4 flex flex-col gap-5 border-l-2")}>
        {items.map((item, index) => (
          <li key={item.id}>
            <span
              className={cn(
                "bg-background text-card-foreground absolute -left-4 flex h-8 w-8 items-center justify-center rounded-full border-2 font-bold",
                {
                  ["bg-primary border-primary text-white"]: item.checked
                }
              )}
            >
              {item.checked ? <Check className="size-5" /> : index + 1}
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
