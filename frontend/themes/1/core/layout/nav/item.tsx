import { ChevronDown, Home } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  HoverCard,
  HoverCardArrow,
  HoverCardContent,
  HoverCardTrigger
} from '@/components/ui/hover-card';
import type { ShowCoreNav } from '@/graphql/hooks';
import { useTextLang } from '@/hooks/core/use-text-lang';

export const ItemNav = ({ name }: ShowCoreNav) => {
  const { convertText } = useTextLang();

  return (
    <li className="flex-shrink-0">
      <HoverCard openDelay={0} closeDelay={0}>
        <HoverCardTrigger>
          <Button variant="ghost">
            <Home /> {convertText(name)} <ChevronDown />
          </Button>
        </HoverCardTrigger>

        <HoverCardContent>
          <div className="flex flex-col max-w-80 p-1">
            <Button variant="ghost" className="justify-start">
              <Home /> Test nav item
            </Button>
            <Button variant="ghost" className="justify-start">
              <Home /> Test nav item
            </Button>
            <Button variant="ghost" className="justify-start">
              <Home /> Test nav item
            </Button>
          </div>
          <HoverCardArrow />
        </HoverCardContent>
      </HoverCard>
    </li>
  );
};
