import { Injectable } from '@nestjs/common';

import { ShowPostsForumsArgs } from './dto/show.args';
import { ShowPostsForumsObj } from './dto/show.obj';

import { PrismaService } from '@/prisma/prisma.service';
import { SortDirectionEnum } from '@/types/database/sortDirection.type';
import { outputPagination } from '@/functions/database/pagination/outputPagination';
import { inputPagination } from '@/functions/database/pagination/inputPagination';
import { Prisma } from '@prisma/client';

@Injectable()
export class ShowPostsForumsService {
  constructor(private prisma: PrismaService) {}

  async show({
    cursor,
    first,
    topic_id,
    cursor_meta_tag
  }: ShowPostsForumsArgs): Promise<ShowPostsForumsObj> {
    const where = {
      topic: {
        id: topic_id
      }
    };

    return await this.prisma.$transaction(async prisma => {
      const posts = await prisma.forum_posts.findMany({
        ...inputPagination({ first, cursor, last: undefined }),
        where,
        include: {
          content: true
        },
        orderBy: { created: SortDirectionEnum.asc }
      });

      // If posts has next page, then stop fetching forum_topics_logs

      const forumTopicsLogs = await prisma.forum_topics_logs.findMany({
        where,
        ...inputPagination({ first, cursor: cursor_meta_tag, last: null }),
        orderBy: { created: SortDirectionEnum.asc }
      });

      const compareData = [...posts, ...forumTopicsLogs].sort((a, b) =>
        a.created > b.created ? 1 : -1
      );

      return {
        posts: compareData
      };
    });

    // const data = await this.prisma.$transaction(async prisma => {
    //   const forumPosts = await prisma.forum_posts.findMany({
    //     take: first,
    //     skip: last,
    //     cursor: cursor ? { id: cursor } : undefined,
    //     orderBy: { created: 'asc' },
    //     include: {
    //       content: true
    //     }
    //   });

    //   const lastForumPost = forumPosts.at(-1);

    //   const forumTopicsLogs = await prisma.forum_topics_logs.findMany({
    //     take: first,
    //     skip: last,
    //     cursor: cursor ? { id: cursor } : undefined,
    //     orderBy: { created: 'asc' }
    //   });

    //   const lastForumTopicLog = forumTopicsLogs.at(-1);

    //   const combinedData = [...forumPosts, ...forumTopicsLogs];

    //   const newCursor =
    //     lastForumPost && lastForumTopicLog
    //       ? lastForumPost.id > lastForumTopicLog.id
    //         ? lastForumPost.id
    //         : lastForumTopicLog.id
    //       : undefined;

    //   return { combinedData, newCursor };
    // });

    // const [edges, totalCount] = await this.prisma.$transaction([
    //   this.prisma.forum_posts.findMany({
    //     ...inputPagination({ first, cursor, last }),
    //     include: {
    //       content: true,
    //       author: {
    //         include: {
    //           avatar: true,
    //           cover: true,
    //           group: {
    //             include: {
    //               name: true
    //             }
    //           }
    //         }
    //       }
    //     },
    //     orderBy: [
    //       {
    //         created: SortDirectionEnum.asc
    //       }
    //     ]
    //   }),
    //   this.prisma.forum_posts.count()
    // ]);

    // return outputPagination({
    //   edges,
    //   totalCount,
    //   first,
    //   cursor,
    //   last
    // });
  }
}
