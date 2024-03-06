import { Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";

import { EditForumTopicsArgs } from "./dto/edit.args";
import { ShowTopicsForums } from "../show/dto/show.obj";

import { DatabaseService } from "@/database/database.service";
import { NotFoundError } from "@/utils/errors/not-found-error";
import { User } from "@/utils/decorators/user.decorator";
import { AccessDeniedError } from "@/utils/errors/AccessDeniedError";
import { TextLanguageInput } from "@/types/database/text-language.type";
import { forum_topics_titles } from "@/src/apps/admin/forum/database/schema/topics";
import { forum_posts_content } from "@/src/apps/admin/forum/database/schema/posts";
import { StatsShowForumForumsService } from "../../forums/show/stats.service";

@Injectable()
export class EditForumTopicsService {
  constructor(
    private databaseService: DatabaseService,
    private statsForumService: StatsShowForumForumsService
  ) {}

  protected updateTitle = async ({
    id,
    title
  }: {
    id: number;
    title: TextLanguageInput[];
  }) => {
    const names =
      await this.databaseService.db.query.forum_topics_titles.findMany({
        where: (table, { eq }) => eq(table.topic_id, id)
      });

    const update = await Promise.all(
      title.map(async item => {
        const itemExist = names.find(
          el => el.language_code === item.language_code
        );

        if (itemExist) {
          // If value is empty, do nothing
          if (!itemExist.value.trim()) return;

          const update = await this.databaseService.db
            .update(forum_topics_titles)
            .set({ ...item, topic_id: id })
            .where(eq(forum_topics_titles.id, itemExist.id))
            .returning();

          return update[0];
        }

        const insert = await this.databaseService.db
          .insert(forum_topics_titles)
          .values({ ...item, topic_id: id })
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
          .delete(forum_topics_titles)
          .where(eq(forum_topics_titles.id, item.id));
      })
    );
  };

  protected updateContent = async ({
    content,
    postId
  }: {
    content: TextLanguageInput[];
    postId: number;
  }) => {
    const names =
      await this.databaseService.db.query.forum_posts_content.findMany({
        where: (table, { eq }) => eq(table.post_id, postId)
      });

    const update = await Promise.all(
      content.map(async item => {
        const itemExist = names.find(
          el => el.language_code === item.language_code
        );

        if (itemExist) {
          // If value is empty, do nothing
          if (!itemExist.value.trim()) return;

          const update = await this.databaseService.db
            .update(forum_posts_content)
            .set({ ...item, post_id: postId })
            .where(eq(forum_posts_content.id, itemExist.id))
            .returning();

          return update[0];
        }

        const insert = await this.databaseService.db
          .insert(forum_posts_content)
          .values({ ...item, post_id: postId })
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
          .delete(forum_posts_content)
          .where(eq(forum_posts_content.id, item.id));
      })
    );
  };

  async edit(
    { content, id, title }: EditForumTopicsArgs,
    user: User
  ): Promise<ShowTopicsForums> {
    const topic = await this.databaseService.db.query.forum_topics.findFirst({
      where: (table, { eq }) => eq(table.id, id),
      with: {
        posts: {
          limit: 1,
          orderBy: (table, { asc }) => asc(table.created)
        }
      }
    });

    if (!topic) {
      throw new NotFoundError("Topic");
    }

    const post = topic.posts.at(0);
    if (post?.user_id !== user.id) {
      throw new AccessDeniedError();
    }

    await this.updateTitle({ id, title });
    await this.updateContent({ postId: post.id, content });

    const dataTopic =
      await this.databaseService.db.query.forum_topics.findFirst({
        where: (table, { eq }) => eq(table.id, id),
        with: {
          title: true,
          forum: {
            with: {
              permissions: {
                where: (table, { eq }) =>
                  eq(table.group_id, user?.group.id ?? 1) // 1 = guest
              }
            }
          },
          posts: {
            limit: 1,
            orderBy: (table, { asc }) => asc(table.created),
            with: {
              content: true,
              user: {
                with: {
                  avatar: true,
                  group: {
                    with: {
                      name: true
                    }
                  }
                }
              }
            }
          }
        }
      });

    const breadcrumbs = await this.statsForumService.breadcrumbs({
      forumId: topic.forum_id
    });

    return {
      ...dataTopic,
      user: dataTopic.posts[0].user,
      content: dataTopic.posts[0].content,
      breadcrumbs,
      permissions: {
        can_reply:
          dataTopic.forum.permissions.at(0)?.can_reply ||
          dataTopic.forum.can_all_reply,
        can_edit: user.id === dataTopic.posts[0].user.id
      }
    };
  }
}
