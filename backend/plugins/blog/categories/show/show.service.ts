import { Injectable } from "@nestjs/common";

import { ShowBlogCategoriesArgs } from "./dto/show.args";
import { ShowBlogCategoriesObj } from "./dto/show.obj";

import { DatabaseService } from "@/plugins/database/database.service";

@Injectable()
export class ShowBlogCategoriesService {
  constructor(private databaseService: DatabaseService) {}

  async show({
    cursor,
    first,
    last
  }: ShowBlogCategoriesArgs): Promise<ShowBlogCategoriesObj> {}
}
