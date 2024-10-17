import { User } from '@/decorators';
import { Injectable } from '@nestjs/common';

import { ShowAdminNavService } from '../../nav/show/show.service';
import {
  NavSearchAdminSessions,
  SearchAdminSessionsArgs,
  SearchAdminSessionsObj,
} from './search.dto';

@Injectable()
export class SearchAdminSessionsService {
  constructor(private readonly navAdminService: ShowAdminNavService) {}

  async search(
    { search: searchFromProp }: SearchAdminSessionsArgs,
    user: User,
  ): Promise<SearchAdminSessionsObj> {
    const search = searchFromProp
      ? searchFromProp.trim().toLowerCase().split(' ')
      : [];

    // Flat map to remove children
    const nav: NavSearchAdminSessions[] = (
      await this.navAdminService.show(user)
    )
      .flatMap(item => {
        const nav = item.nav.flatMap(nav => ({
          code_plugin: item.code,
          ...nav,
        }));

        return nav.flatMap(nav => {
          const mappedChildren = (nav.children ?? []).map(child => ({
            code_plugin: nav.code_plugin,
            parent_nav_code: nav.children ? nav.code : undefined,
            ...child,
          }));

          return [nav, ...mappedChildren];
        });
      })
      .filter(nav => nav.keywords.length);

    if (search.length === 0) {
      return {
        nav: nav.splice(0, 10),
      };
    }

    return {
      nav: nav.filter(
        nav =>
          nav.keywords.some(item =>
            search.some(search => item.toLowerCase().includes(search)),
          ) || search.some(search => nav.code.toLowerCase().includes(search)),
      ),
    };
  }
}
