import { Injectable } from "@nestjs/common";

import { CreatePluginCategoriesArgs } from "./dto/create.args";

import { ShowBlogCategories } from "@/plugins/blog/categories/show/dto/show.obj";
import {
  blog_categories,
  blog_categories_description,
  blog_categories_name,
  blog_categories_permissions
} from "../../database/schema/categories";
import { ParserTextLanguageCoreHelpersService } from "@/plugins/core/helpers/text_language/parser/parser.service";
import { DatabaseService } from "@/database/database.service";

@Injectable()
export class CreateBlogCategoriesService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly parserTextLang: ParserTextLanguageCoreHelpersService
  ) {}

  async create({
    color,
    description,
    name,
    permissions
  }: CreatePluginCategoriesArgs): Promise<ShowBlogCategories> {
    const categories = await this.databaseService.db
      .insert(blog_categories)
      .values({ color, ...permissions })
      .returning();

    const categoryId = categories[0].id;

    await this.parserTextLang.parse({
      item_id: categoryId,
      database: blog_categories_name,
      data: name
    });

    await this.parserTextLang.parse({
      item_id: categoryId,
      database: blog_categories_description,
      data: description
    });

    const data = await this.databaseService.db.query.blog_categories.findFirst({
      where: (table, { eq }) => eq(table.id, categoryId),
      with: {
        name: true,
        description: true
      }
    });

    // Set permissions
    if (permissions.groups.length > 0) {
      await this.databaseService.db.insert(blog_categories_permissions).values(
        permissions.groups.map(item => ({
          blog_id: data[0].id,
          group_id: item.group_id,
          ...item
        }))
      );
    }

    return data;
  }
}
