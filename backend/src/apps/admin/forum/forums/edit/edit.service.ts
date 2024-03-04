import { Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";

import { CreateForumForumsObj } from "../create/dto/create.obj";
import { EditForumForumsArgs } from "./dto/edit.args";
import { PermissionsCreateForumForums } from "../create/dto/create.args";

import { DatabaseService } from "@/database/database.service";
import { NotFoundError } from "@/utils/errors/not-found-error";
import {
  forum_forums,
  forum_forums_description,
  forum_forums_name,
  forum_forums_permissions
} from "../../database/schema/forums";
import { TextLanguageInput } from "@/types/database/text-language.type";
import { StatsShowForumForumsService } from "@/apps/forum/forums/show/stats.service";
import { LastPostsForumForumsService } from "@/apps/forum/forums/show/last_posts/last_posts.service";

@Injectable()
export class EditForumForumsService {
  constructor(
    private databaseService: DatabaseService,
    private statsService: StatsShowForumForumsService,
    private lastPostsService: LastPostsForumForumsService
  ) {}

  protected updateName = async ({
    id,
    name
  }: {
    id: number;
    name: TextLanguageInput[];
  }) => {
    const names =
      await this.databaseService.db.query.forum_forums_name.findMany({
        where: (table, { eq }) => eq(table.forum_id, id)
      });

    const update = await Promise.all(
      name.map(async item => {
        const itemExist = names.find(
          el => el.language_code === item.language_code
        );

        if (itemExist) {
          // If value is empty, do nothing
          if (!itemExist.value.trim()) return;

          const update = await this.databaseService.db
            .update(forum_forums_name)
            .set({ ...item, forum_id: id })
            .where(eq(forum_forums_name.id, itemExist.id))
            .returning();

          return update[0];
        }

        const insert = await this.databaseService.db
          .insert(forum_forums_name)
          .values({ ...item, forum_id: id })
          .returning();

        return insert[0];
      })
    );

    // Delete remaining translations
    Promise.all(
      names.map(async item => {
        const exist = update.find(name => name.id === item.id);
        if (exist) return;

        await this.databaseService.db
          .delete(forum_forums_name)
          .where(eq(forum_forums_name.id, item.id));
      })
    );
  };

  protected updateDescription = async ({
    description,
    id
  }: {
    description: TextLanguageInput[];
    id: number;
  }) => {
    const descriptions =
      await this.databaseService.db.query.forum_forums_description.findMany({
        where: (table, { eq }) => eq(table.forum_id, id)
      });

    const update = await Promise.all(
      description.map(async item => {
        const itemExist = descriptions.find(
          el => el.language_code === item.language_code
        );

        if (itemExist) {
          // If value is empty, do nothing
          if (!itemExist.value.trim()) return;

          const update = await this.databaseService.db
            .update(forum_forums_description)
            .set({ ...item, forum_id: id })
            .where(eq(forum_forums_description.id, itemExist.id))
            .returning();

          return update[0];
        }

        await this.databaseService.db
          .insert(forum_forums_description)
          .values({ ...item, forum_id: id })
          .returning();
      })
    );

    // Delete remaining translations
    Promise.all(
      descriptions.map(async item => {
        const exist = update.find(name => name.id === item.id);
        if (exist) return;

        await this.databaseService.db
          .delete(forum_forums_description)
          .where(eq(forum_forums_description.id, item.id));
      })
    );
  };

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
        can_view: permissions.can_all_view
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

  async edit({
    description,
    id,
    name,
    parent_id,
    permissions
  }: EditForumForumsArgs): Promise<CreateForumForumsObj> {
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
        parent_id
      })
      .where(eq(forum_forums.id, id))
      .returning();

    await this.updateName({ name, id });
    await this.updateDescription({ description, id });

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
      forumId: id
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
            forumId: item.id
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
