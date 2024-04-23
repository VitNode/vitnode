import {
  ArgsType,
  Field,
  InputType,
  Int,
  registerEnumType
} from "@nestjs/graphql";
import { Transform } from "class-transformer";

import { SortDirectionEnum } from "@/types/database/sortDirection.type";
import { TransformString } from "@/types/database/text-language.type";
import { PaginationArgs } from "@/types/database/pagination.type";

export enum ShowAdminMembersSortingColumnEnum {
  name = "name",
  joined = "joined",
  first_name = "first_name",
  last_name = "last_name",
  posts = "posts",
  followers = "followers",
  reactions = "reactions"
}

registerEnumType(ShowAdminMembersSortingColumnEnum, {
  name: "ShowAdminMembersSortingColumnEnum"
});

@InputType()
class ShowAdminMembersSortByArgs {
  @Field(() => ShowAdminMembersSortingColumnEnum)
  column: ShowAdminMembersSortingColumnEnum;

  @Field(() => SortDirectionEnum)
  direction: SortDirectionEnum;
}

@ArgsType()
export class ShowAdminMembersArgs extends PaginationArgs {
  @Field(() => ShowAdminMembersSortByArgs, { nullable: true })
  sortBy: ShowAdminMembersSortByArgs | null;

  @Transform(TransformString)
  @Field(() => String, { nullable: true })
  search: string | null;

  @Field(() => [Int], { nullable: true })
  groups: number[] | null;
}
