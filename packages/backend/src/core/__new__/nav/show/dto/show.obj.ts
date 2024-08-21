import { TextLanguage } from '@/utils';

class ItemShowNavCore {
  id: number;
  name: TextLanguage[];
  description: TextLanguage[];
  href: string;
  position: number;
  external: boolean;
  icon: string | null;
}

export class ShowNavCore extends ItemShowNavCore {
  children: ItemShowNavCore[];
}

class PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: number | null;
  endCursor: number | null;
  totalCount: number;
  count: number;
}

export class ShowNavCoreObj {
  edges: ShowNavCore[];
  pageInfo: PageInfo;
}
