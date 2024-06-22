import { Injectable } from "@nestjs/common";
import { count } from "drizzle-orm";
import {
  inputPaginationCursor,
  outputPagination,
  SortDirectionEnum,
  DatabaseService,
} from "vitnode-backend";

import { ShowBlogCategoriesArgs } from "./dto/show.args";
import { ShowBlogCategoriesObj } from "./dto/show.obj";

import { blog_categories } from "../../admin/database/schema/categories";

@Injectable()
export class ShowBlogCategoriesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async show({
    cursor,
    first,
    last,
  }: ShowBlogCategoriesArgs): Promise<ShowBlogCategoriesObj> {
    const pagination = await inputPaginationCursor({
      cursor,
      database: blog_categories,
      databaseService: this.databaseService,
      first,
      last,
      primaryCursor: {
        column: "id",
        schema: blog_categories.id,
      },
      defaultSortBy: {
        direction: SortDirectionEnum.asc,
        column: "position",
      },
    });

    const edges = await this.databaseService.db.query.blog_categories.findMany({
      ...pagination,
      with: {
        name: true,
        description: true,
      },
    });

    const totalCount = await this.databaseService.db
      .select({ count: count() })
      .from(blog_categories);

    return outputPagination({
      edges,
      totalCount,
      first,
      cursor,
      last,
    });
  }
}
