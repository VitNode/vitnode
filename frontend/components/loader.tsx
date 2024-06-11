import { Loader2 } from "lucide-react";
import { cn } from "@vitnode/frontend/helpers";

interface Props {
  className?: string;
  small?: boolean;
}

export const Loader = ({ className, small }: Props) => {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <Loader2
        className={cn("size-10 animate-spin", {
          "size-4": small
        })}
      />
    </div>
  );
};
