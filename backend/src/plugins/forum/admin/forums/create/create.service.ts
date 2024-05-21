import { Injectable } from "@nestjs/common";

import { CreateForumForumsArgs } from "./dto/create.args";
import { CreateForumForumsObj } from "./dto/create.obj";

import {
  forum_forums,
  forum_forums_description,
  forum_forums_name,
  forum_forums_permissions
} from "@/plugins/forum/admin/database/schema/forums";
import { NotFoundError } from "@/utils/errors/not-found-error";
import { ParserTextLanguageCoreHelpersService } from "@/plugins/core/helpers/text_language/parser/parser.service";
import { DatabaseService } from "@/database/database.service";
import { CustomError } from "@/utils/errors/custom-error";

@Injectable()
export class CreateForumForumsService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly parserTextLang: ParserTextLanguageCoreHelpersService
  ) {}

  async create({
    description,
    name,
    parent_id,
    permissions
  }: CreateForumForumsArgs): Promise<CreateForumForumsObj> {
    if (parent_id) {
      const parent = await this.databaseService.db.query.forum_forums.findFirst(
        {
          where: (table, { eq }) => eq(table.id, parent_id)
        }
      );

      if (!parent) {
        throw new CustomError({
          code: "FORUMS_PARENT_NOT_FOUND",
          message: "Parent not found"
        });
      }
    }

    const theMostHighestPosition =
      await this.databaseService.db.query.forum_forums.findFirst({
        where: (table, { eq }) => eq(table.parent_id, parent_id),
        orderBy: (table, { desc }) => desc(table.position)
      });

    const data = await this.databaseService.db
      .insert(forum_forums)
      .values({
        position: theMostHighestPosition
          ? theMostHighestPosition.position + 1
          : 0,
        parent_id,
        ...permissions
      })
      .returning();

    // Set name
    await this.parserTextLang.parse({
      item_id: data[0].id,
      database: forum_forums_name,
      data: name
    });

    // Set description
    await this.parserTextLang.parse({
      item_id: data[0].id,
      database: forum_forums_description,
      data: description
    });

    // Set permissions
    if (permissions.groups.length > 0) {
      await this.databaseService.db.insert(forum_forums_permissions).values(
        permissions.groups.map(item => ({
          forum_id: data[0].id,
          group_id: item.group_id,
          ...item
        }))
      );
    }

    const forum = await this.databaseService.db.query.forum_forums.findFirst({
      where: (table, { eq }) => eq(table.id, data[0].id),
      with: {
        name: true,
        description: true,
        permissions: true
      }
    });

    if (!forum) {
      throw new NotFoundError("Forum");
    }

    return {
      ...forum,
      _count: {
        topics: 0,
        posts: 0,
        total_posts: 0,
        total_topics: 0
      },
      last_posts: {
        edges: [],
        pageInfo: {
          count: 0,
          totalCount: 0,
          hasNextPage: false,
          hasPreviousPage: false,
          startCursor: null,
          endCursor: null
        }
      },
      children: [],
      breadcrumbs: []
    };
  }
}
