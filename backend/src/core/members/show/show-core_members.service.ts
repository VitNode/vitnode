import { Injectable } from '@nestjs/common';

import { ShowCoreMembersObj } from './dto/show-core_members.obj';
import { ShowCoreMembersArgs } from './dto/show-core_members.args';

import { PrismaService } from '@/src/prisma/prisma.service';
import { inputPagination } from '@/functions/pagination/inputPagination';
import { outputPagination } from '@/functions/pagination/outputPagination';

@Injectable()
export class ShowCoreMembersService {
  constructor(private prisma: PrismaService) {}

  async show({ cursor, first }: ShowCoreMembersArgs): Promise<ShowCoreMembersObj> {
    const edges = await this.prisma.core_members.findMany({
      ...inputPagination({ first, cursor }),
      select: {
        id: true,
        name: true,
        name_seo: true,
        email: true,
        group_id: true,
        joined: true,
        birthday: true,
        first_name: true,
        last_name: true,
        avatar: true,
        image_cover: true,
        posts: true,
        followers: true,
        reactions: true,
        newsletter: true,
        hide_real_name: true,
        avatar_color: true,
        unread_notifications: true
      },
      orderBy: {
        joined: 'asc'
      }
    });

    const totalCount = await this.prisma.core_members.count();

    return outputPagination({ edges, totalCount, first, cursor });
  }
}
