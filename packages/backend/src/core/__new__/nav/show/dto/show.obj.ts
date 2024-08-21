import { TextLanguage } from '@/utils';

class ShowCoreNavItem {
  id: number;
  name: TextLanguage[];
  description: TextLanguage[];
  href: string;
  position: number;
  external: boolean;
  icon: string | null;
}

export class ShowCoreNav extends ShowCoreNavItem {
  children: ShowCoreNavItem[];
}

class PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: number | null;
  endCursor: number | null;
  totalCount: number;
  count: number;
}

export class ShowCoreNavObj {
  edges: ShowCoreNav[];
  pageInfo: PageInfo;
}
