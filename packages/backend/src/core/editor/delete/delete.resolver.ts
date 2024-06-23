import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { DeleteCoreEditorService } from "./delete.service";
import { DeleteCoreEditorArgs } from "./dto/delete.args";

import { AuthGuards } from "../../../utils";
import { CurrentUser, User } from "../../../decorators";

@Resolver()
export class DeleteCoreEditorResolver {
  constructor(private readonly service: DeleteCoreEditorService) {}

  @Mutation(() => String)
  @UseGuards(AuthGuards)
  async core_editor_files__delete(
    @CurrentUser() currentUser: User,
    @Args() args: DeleteCoreEditorArgs,
  ): Promise<string> {
    return this.service.delete(currentUser, args);
  }
}
