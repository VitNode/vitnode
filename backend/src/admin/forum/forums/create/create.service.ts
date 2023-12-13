import { Injectable } from '@nestjs/common';

import { CreateForumForumsArgs } from './dto/create.args';

import { ShowForumForumsWithParent } from '../../../../forums/forums/show/dto/show.obj';
import { PrismaService } from '@/prisma/prisma.service';
import { CustomError } from '@/utils/errors/CustomError';
import { currentDate } from '@/functions/date';
import { SortDirectionEnum } from '@/types/database/sortDirection.type';
import { convertTextToTextSEO } from '@/functions/seo';

@Injectable()
export class CreateForumForumsService {
  constructor(private prisma: PrismaService) {}

  async create({
    description,
    name,
    name_seo,
    parent_id
  }: CreateForumForumsArgs): Promise<ShowForumForumsWithParent> {
    if (name_seo) {
      const checkNameSEO = await this.prisma.forum_forums.findFirst({
        where: {
          name_seo
        }
      });

      if (checkNameSEO) {
        throw new CustomError({
          code: 'FORUM_NAME_SEO_ALREADY_EXISTS',
          message: 'Name SEO already exists'
        });
      }
    }

    if (parent_id) {
      const parent = await this.prisma.forum_forums.findUnique({
        where: {
          id: parent_id
        }
      });

      if (!parent) {
        throw new CustomError({
          code: 'FORUMS_PARENT_NOT_FOUND',
          message: 'Parent not found'
        });
      }
    }

    const theMostHighestPosition = await this.prisma.forum_forums.findFirst({
      where: {
        parent_id: parent_id || null
      },
      orderBy: {
        position: 'desc'
      }
    });

    let defaultNameSEO = '';

    if (!name_seo) {
      const languageDefault = await this.prisma.core_languages.findFirst({
        where: {
          default: true
        }
      });

      const findNameWithDefaultLang = name.find(item => item.id_language === languageDefault.id);
      if (findNameWithDefaultLang) {
        defaultNameSEO = findNameWithDefaultLang.value;
      } else {
        defaultNameSEO = name[0].value;
      }
    }
    const date = new Date();
    const forum = await this.prisma.forum_forums.create({
      data: {
        name: {
          create: name
        },
        description: {
          create: description
        },
        name_seo: convertTextToTextSEO(name_seo ? name_seo : `${defaultNameSEO}-${date.getTime()}`),
        position: theMostHighestPosition ? theMostHighestPosition.position + 1 : 0,
        created: currentDate(),
        parent: parent_id
          ? {
              connect: {
                id: parent_id
              }
            }
          : undefined
      },
      include: {
        name: true,
        description: true,
        parent: {
          include: {
            name: true,
            description: true,
            _count: {
              select: {
                children: true
              }
            }
          }
        },
        children: {
          orderBy: [
            {
              position: SortDirectionEnum.asc
            }
          ],
          include: {
            name: true,
            description: true,
            _count: {
              select: {
                children: true
              }
            },
            children: {
              orderBy: [
                {
                  position: SortDirectionEnum.asc
                }
              ],
              include: {
                name: true,
                description: true,
                _count: {
                  select: {
                    children: true
                  }
                }
              }
            }
          }
        },
        _count: {
          select: {
            children: true
          }
        }
      }
    });

    return forum;
  }
}
