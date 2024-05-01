import { Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";

import { CreateForumForumsObj } from "../create/dto/create.obj";
import { EditForumForumsArgs } from "./dto/edit.args";
import { PermissionsCreateForumForums } from "../create/dto/create.args";

import { DatabaseService } from "@/plugins/database/database.service";
import { NotFoundError } from "@/utils/errors/not-found-error";
import {
  forum_forums,
  forum_forums_description,
  forum_forums_name,
  forum_forums_permissions
} from "../../database/schema/forums";
import { StatsShowForumForumsService } from "@/plugins/forum/forums/show/stats.service";
import { LastPostsForumForumsService } from "@/plugins/forum/forums/show/last_posts/last_posts.service";
import { User } from "@/utils/decorators/user.decorator";
import { ParserTextLanguageCoreHelpersService } from "@/plugins/core/helpers/text_language/parser/parser.service";

@Injectable()
export class EditForumForumsService {
  constructor(
    private databaseService: DatabaseService,
    private statsService: StatsShowForumForumsService,
    private lastPostsService: LastPostsForumForumsService,
    private parserTextLang: ParserTextLanguageCoreHelpersService
  ) {}

  protected updatePermissions = async ({
    id,
    permissions
  }: {
    id: number;
    permissions: PermissionsCreateForumForums;
  }) => {
    // Uprate main permissions
    await this.databaseService.db
      .update(forum_forums_permissions)
      .set({
        can_create: permissions.can_all_create,
        can_read: permissions.can_all_read,
        can_reply: permissions.can_all_reply,
        can_view: permissions.can_all_view,
        can_download_files: permissions.can_all_download_files
      })
      .where(eq(forum_forums_permissions.forum_id, id))
      .returning();

    const getAllPermissions =
      await this.databaseService.db.query.forum_forums_permissions.findMany({
        where: (table, { eq }) => eq(table.forum_id, id)
      });

    const update = await Promise.all(
      permissions.groups.map(async item => {
        const itemExist = getAllPermissions.find(el => el.group_id === item.id);

        if (itemExist) {
          const update = await this.databaseService.db
            .update(forum_forums_permissions)
            .set({ ...item, forum_id: id })
            .where(eq(forum_forums_permissions.id, itemExist.id))
            .returning();

          return update[0];
        }

        const insert = await this.databaseService.db
          .insert(forum_forums_permissions)
          .values({ ...item, forum_id: id })
          .returning();

        return insert[0];
      })
    );

    // Delete remaining groups
    Promise.all(
      getAllPermissions.map(async item => {
        const exist = update.find(name => name.id === item.id);
        if (exist) return;

        await this.databaseService.db
          .delete(forum_forums_permissions)
          .where(eq(forum_forums_permissions.id, item.id));
      })
    );
  };

  async edit(
    { description, id, name, parent_id, permissions }: EditForumForumsArgs,
    user: User | null
  ): Promise<CreateForumForumsObj> {
    const forum = await this.databaseService.db.query.forum_forums.findFirst({
      where: (table, { eq }) => eq(table.id, id)
    });

    if (!forum) {
      throw new NotFoundError("Forum");
    }

    const parent = await this.databaseService.db.query.forum_forums.findFirst({
      where: (table, { eq }) => eq(table.id, parent_id)
    });

    if (!parent && parent_id) {
      throw new NotFoundError("Parent");
    }

    await this.databaseService.db
      .update(forum_forums)
      .set({
        can_all_create: permissions.can_all_create,
        can_all_read: permissions.can_all_read,
        can_all_reply: permissions.can_all_reply,
        can_all_view: permissions.can_all_view,
        can_all_download_files: permissions.can_all_download_files,
        parent_id
      })
      .where(eq(forum_forums.id, id))
      .returning();

    await this.parserTextLang.parse({
      item_id: id,
      database: forum_forums_name,
      data: name
    });

    await this.parserTextLang.parse({
      item_id: id,
      database: forum_forums_description,
      data: description
    });

    const dataUpdate =
      await this.databaseService.db.query.forum_forums.findFirst({
        where: (table, { eq }) => eq(table.id, id),
        with: {
          name: true,
          description: true,
          permissions: true
        }
      });

    const children = await this.databaseService.db.query.forum_forums.findMany({
      where: (table, { eq }) => eq(table.parent_id, id),
      with: {
        name: true,
        description: true,
        permissions: true
      }
    });

    const {
      children: breadcrumbs,
      stats,
      topic_ids
    } = await this.statsService.topicsPosts({
      forumId: id,
      user
    });
    const last_posts = await this.lastPostsService.lastPosts({
      topicIds: topic_ids,
      first: null,
      cursor: null,
      last: null,
      sortBy: null
    });

    return {
      ...dataUpdate,
      last_posts,
      _count: {
        ...stats
      },
      breadcrumbs,
      children: await Promise.all(
        children.map(async item => {
          const {
            children: breadcrumbs,
            stats,
            topic_ids
          } = await this.statsService.topicsPosts({
            forumId: item.id,
            user
          });

          const last_posts = await this.lastPostsService.lastPosts({
            topicIds: topic_ids,
            first: null,
            cursor: null,
            last: null,
            sortBy: null
          });

          return {
            ...item,
            last_posts,
            breadcrumbs,
            children: [],
            _count: {
              ...stats
            }
          };
        })
      )
    };
  }
}
