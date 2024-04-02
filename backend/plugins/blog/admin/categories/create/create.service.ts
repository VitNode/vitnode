import { Injectable } from "@nestjs/common";

import { CreatePluginCategoriesArgs } from "./dto/create.args";

import { DatabaseService } from "@/plugins/database/database.service";
import { ShowBlogCategories } from "@/plugins/blog/categories/show/dto/show.obj";
import {
  blog_categories,
  blog_categories_description,
  blog_categories_name
} from "../../database/schema/categories";

@Injectable()
export class CreateBlogCategoriesService {
  constructor(private databaseService: DatabaseService) {}

  async create({
    color,
    description,
    name
  }: CreatePluginCategoriesArgs): Promise<ShowBlogCategories> {
    const categories = await this.databaseService.db
      .insert(blog_categories)
      .values({ color })
      .returning();

    const categoryId = categories[0].id;

    await this.databaseService.db
      .insert(blog_categories_name)
      .values(name.map(item => ({ ...item, category_id: categoryId })));

    if (description.length) {
      await this.databaseService.db
        .insert(blog_categories_description)
        .values(
          description.map(item => ({ ...item, category_id: categoryId }))
        );
    }

    const data = await this.databaseService.db.query.blog_categories.findFirst({
      where: (table, { eq }) => eq(table.id, categoryId),
      with: {
        name: true,
        description: true
      }
    });

    return data;
  }
}
