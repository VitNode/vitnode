import { BookOpenIcon, BracesIcon, LayoutIcon, LucideIcon } from 'lucide-react';

export interface Mode {
  param: string;
  name: string;
  description: string;
  icon: LucideIcon;
}

export const modes: Mode[] = [
  {
    param: 'guides',
    name: 'Guides',
    description: 'Learn how to use',
    icon: BookOpenIcon,
  },
  {
    param: 'dev',
    name: 'Development',
    description: 'The dev environment',
    icon: BracesIcon,
  },
  {
    param: 'ui',
    name: 'UI',
    description: 'Make it pretty',
    icon: LayoutIcon,
  },
];
