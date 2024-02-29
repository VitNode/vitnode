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

enum ShowCoreMembersSortingColumnEnum {
  name = "name",
  joined = "joined",
  first_name = "first_name",
  last_name = "last_name",
  posts = "posts",
  followers = "followers",
  reactions = "reactions"
}

registerEnumType(ShowCoreMembersSortingColumnEnum, {
  name: "ShowCoreMembersSortingColumnEnum"
});

@InputType()
class ShowCoreMembersSortByArgs {
  @Field(() => ShowCoreMembersSortingColumnEnum)
  column: ShowCoreMembersSortingColumnEnum;

  @Field(() => SortDirectionEnum)
  direction: SortDirectionEnum;
}

@ArgsType()
export class ShowCoreMembersArgs {
  @Field(() => Int, { nullable: true })
  cursor: number | null;

  @Field(() => Int, { nullable: true })
  first: number | null;

  @Field(() => Int, { nullable: true })
  last: number | null;

  @Field(() => [ShowCoreMembersSortByArgs], { nullable: true })
  sortBy: ShowCoreMembersSortByArgs[] | null;

  @Transform(TransformString)
  @Field(() => String, { nullable: true })
  search: string | null;

  @Transform(TransformString)
  @Field(() => String, { nullable: true })
  name_seo: string | null;
}
