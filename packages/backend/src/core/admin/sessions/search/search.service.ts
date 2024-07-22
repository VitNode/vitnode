import { Injectable } from '@nestjs/common';

import { SearchAdminSessionsArgs } from './dto/search.args';
import {
  NavSearchAdminSessions,
  SearchAdminSessionsObj,
} from './dto/search.obj';

import { ShowAdminNavService } from '../../nav/show/show.service';

@Injectable()
export class SearchAdminSessionsService {
  constructor(private readonly navAdminService: ShowAdminNavService) {}

  async search({
    search: searchFromProp,
  }: SearchAdminSessionsArgs): Promise<SearchAdminSessionsObj> {
    const search = searchFromProp
      ? searchFromProp.trim().toLowerCase().split(' ')
      : [];

    // Flat map to remove children
    const nav: NavSearchAdminSessions[] = (
      await this.navAdminService.show()
    ).flatMap(item => {
      const nav = item.nav.flatMap(nav => ({
        code_plugin: item.code,
        ...nav,
      }));

      return nav.flatMap(nav => {
        const children = nav.children ?? [];
        const mappedChildren = children.map(child => ({
          code_plugin: nav.code_plugin,
          parent_nav_code: nav.children ? nav.code : undefined,
          ...child,
        }));

        return [nav, ...mappedChildren];
      });
    });

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
