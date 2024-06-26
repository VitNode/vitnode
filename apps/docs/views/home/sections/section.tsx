import { Check } from "lucide-react";
import type { ReactNode } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { WrapperSection } from "./wrapper";

interface Props {
  children: ReactNode;
  description: string;
  items: { id: number; text: ReactNode }[];
  title: string;
  animateFromRight?: boolean;
  footer?: ReactNode;
}

export const SectionHome = ({
  animateFromRight,
  children,
  description,
  footer,
  items,
  title
}: Props) => {
  return (
    <WrapperSection animateFromRight={animateFromRight}>
      <CardContent className="sm:p-10 p-6 flex sm:gap-20 gap-10 flex-col h-full">
        <div className="flex-1 flex flex-col gap-5">
          <div>
            <h2 className="font-semibold text-xl">{title}</h2>
            <p className="text-muted-foreground tex-sm">{description}</p>
          </div>

          <ul className="space-y-1">
            {items.map(item => (
              <li
                key={item.id}
                className="flex gap-2 items-center [&>svg]:size-5 [&>svg]:flex-shrink-0"
              >
                <Check />
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
          {footer}
        </div>

        {children}
      </CardContent>
    </WrapperSection>
  );
};
