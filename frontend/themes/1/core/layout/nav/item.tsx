import { ChevronDown, Home } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  HoverCard,
  HoverCardArrow,
  HoverCardContent,
  HoverCardTrigger
} from '@/components/ui/hover-card';

export const ItemNav = () => {
  return (
    <li className="flex-shrink-0">
      <HoverCard openDelay={0} closeDelay={0}>
        <HoverCardTrigger>
          <Button variant="ghost">
            <Home /> Test nav item <ChevronDown />
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
