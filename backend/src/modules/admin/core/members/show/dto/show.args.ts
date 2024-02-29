import {
  ArgsType,
  Field,
  InputType,
  Int,
  registerEnumType
} from "@nestjs/graphql";
import { Transform } from "class-transformer";

import { SortDirectionEnum } from "@/src/types/database/sortDirection.type";
import { TransformString } from "@/src/types/database/text-language.type";

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
export class ShowAdminMembersArgs {
  @Field(() => Int, { nullable: true })
  cursor: number | null;

  @Field(() => Int, { nullable: true })
  first: number | null;

  @Field(() => Int, { nullable: true })
  last: number | null;

  @Field(() => [ShowAdminMembersSortByArgs], { nullable: true })
  sortBy: ShowAdminMembersSortByArgs[] | null;

  @Transform(TransformString)
  @Field(() => String, { nullable: true })
  search: string | null;

  @Field(() => [Int], { nullable: true })
  groups: number[] | null;
}
