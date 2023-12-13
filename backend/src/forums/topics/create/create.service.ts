import { Injectable } from '@nestjs/common';

import { CreateForumTopicsArgs } from './dto/create.args';
import { ShowTopicsForums } from '../show/dto/show.obj';

import { PrismaService } from '@/prisma/prisma.service';
import { NotFountError } from '@/utils/errors/not-found';
import { currentDate } from '@/functions/date';
import { User } from '@/utils/decorators/user.decorator';
import { TextLanguageInput } from '@/types/database/text-language.type';

@Injectable()
export class CreateForumTopicsService {
  constructor(private prisma: PrismaService) {}

  protected async createUrl(name: TextLanguageInput[]) {
    const languageDefault = await this.prisma.core_languages.findFirst({
      where: {
        default: true
      }
    });

    const findNameWithDefaultLang = name.find(item => item.id_language === languageDefault.id);
    if (findNameWithDefaultLang) {
      return findNameWithDefaultLang.value;
    }

    return name[0].value;
  }

  async create(
    { id }: User,
    { content, forum_id, name }: CreateForumTopicsArgs
  ): Promise<ShowTopicsForums> {
    const forum = await this.prisma.forum_forums.findUnique({
      where: {
        id: forum_id
      }
    });

    if (!forum) {
      throw new NotFountError('Forum');
    }

    const topic = await this.prisma.forum_topics.create({
      data: {
        forum: {
          connect: {
            id: forum_id
          }
        },
        name: {
          create: name
        },
        content: {
          create: content
        },
        created: currentDate(),
        url: await this.createUrl(name),
        author: {
          connect: {
            id
          }
        }
      },
      include: {
        name: true,
        content: true
      }
    });

    return topic;
  }
}
