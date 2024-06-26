import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AdminAuthGuards } from 'vitnode-backend';

import { CreateBlogCategoriesService } from './create.service';
import { CreatePluginCategoriesArgs } from './dto/create.args';

import { ShowBlogCategories } from '@/plugins/blog/categories/show/dto/show.obj';

@Resolver()
export class CreateBlogCategoriesResolver {
  constructor(private readonly service: CreateBlogCategoriesService) {}

  @Mutation(() => ShowBlogCategories)
  @UseGuards(AdminAuthGuards)
  async admin__blog_categories__create(
    @Args() args: CreatePluginCategoriesArgs,
  ): Promise<ShowBlogCategories> {
    return this.service.create(args);
  }
}
