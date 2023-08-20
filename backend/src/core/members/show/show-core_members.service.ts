import { Injectable } from '@nestjs/common';

import { ShowCoreMembersObj } from './dto/show-core_members.obj';

@Injectable()
export class ShowCoreMembersService {
  show(): ShowCoreMembersObj {
    return {
      pageInfo: {
        hasNextPage: false,
        hasPreviousPage: false,
        startCursor: '',
        endCursor: '',
        totalCount: 0
      }
    };
  }
}
