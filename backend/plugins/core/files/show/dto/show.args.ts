import { ArgsType, Field, InputType, registerEnumType } from "@nestjs/graphql";

import { PaginationArgs } from "@/types/database/pagination.type";
import { SortDirectionEnum } from "@/types/database/sortDirection.type";

enum ShowCoreFilesSortingColumnEnum {
  created = "created"
}

registerEnumType(ShowCoreFilesSortingColumnEnum, {
  name: "ShowCoreFilesSortingColumnEnum"
});

@InputType()
class SortByArgs {
  @Field(() => ShowCoreFilesSortingColumnEnum)
  column: ShowCoreFilesSortingColumnEnum;

  @Field(() => SortDirectionEnum)
  direction: SortDirectionEnum;
}

@ArgsType()
export class ShowCoreFilesArgs extends PaginationArgs {
  @Field(() => [SortByArgs], { nullable: true })
  sortBy: SortByArgs[] | null;
}
