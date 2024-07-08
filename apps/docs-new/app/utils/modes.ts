import { LayoutIcon, LibraryIcon, LucideIcon } from 'lucide-react';

export interface Mode {
  param: string;
  name: string;
  description: string;
  icon: LucideIcon;
}

export const modes: Mode[] = [
  {
    param: 'dev',
    name: 'Development',
    description: 'The dev environment',
    icon: LibraryIcon,
  },
  {
    param: 'ui',
    name: 'UI',
    description: 'The user interface',
    icon: LayoutIcon,
  },
];
