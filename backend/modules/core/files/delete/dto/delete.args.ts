import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export class DeleteCoreFilesArgs {
  @Field(() => String)
  dir_folder: string;

  @Field(() => String)
  name: string;
}
