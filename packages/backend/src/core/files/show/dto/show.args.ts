import { ArgsType, Field, InputType, registerEnumType } from "@nestjs/graphql";

import { PaginationArgs, SortDirectionEnum } from "../../../../utils";

enum ShowCoreFilesSortingColumnEnum {
  created = "created",
  file_size = "file_size"
}

registerEnumType(ShowCoreFilesSortingColumnEnum, {
  name: "ShowCoreFilesSortingColumnEnum"
});

@InputType()
class ShowCoreFilesSortByArgs {
  @Field(() => ShowCoreFilesSortingColumnEnum)
  column: ShowCoreFilesSortingColumnEnum;

  @Field(() => SortDirectionEnum)
  direction: SortDirectionEnum;
}

@ArgsType()
export class ShowCoreFilesArgs extends PaginationArgs {
  @Field(() => ShowCoreFilesSortByArgs, { nullable: true })
  sortBy: ShowCoreFilesSortByArgs | null;

  @Field(() => String, { nullable: true })
  search: string | null;
}
