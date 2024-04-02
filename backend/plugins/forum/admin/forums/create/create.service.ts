import { Injectable } from "@nestjs/common";

import { CreateForumForumsArgs } from "./dto/create.args";
import { CreateForumForumsObj } from "./dto/create.obj";

import { CustomError } from "@/utils/errors/CustomError";
import { DatabaseService } from "@/plugins/database/database.service";
import {
  forum_forums,
  forum_forums_description,
  forum_forums_name,
  forum_forums_permissions
} from "@/plugins/forum/admin/database/schema/forums";
import { NotFoundError } from "@/utils/errors/not-found-error";

@Injectable()
export class CreateForumForumsService {
  constructor(private databaseService: DatabaseService) {}

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
        can_all_create: permissions.can_all_create,
        can_all_read: permissions.can_all_read,
        can_all_reply: permissions.can_all_reply,
        can_all_view: permissions.can_all_view
      })
      .returning();

    // Set name
    await this.databaseService.db.insert(forum_forums_name).values(
      name.map(item => ({
        forum_id: data[0].id,
        ...item
      }))
    );

    // Set description
    if (description.length > 0) {
      await this.databaseService.db.insert(forum_forums_description).values(
        description.map(item => ({
          forum_id: data[0].id,
          ...item
        }))
      );
    }

    // Set permissions
    if (permissions.groups.length > 0) {
      await this.databaseService.db.insert(forum_forums_permissions).values(
        permissions.groups.map(item => ({
          forum_id: data[0].id,
          group_id: item.id,
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
