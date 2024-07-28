import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class DeleteCoreFilesArgs {
  @Field(() => String)
  dir_folder: string;

  @Field(() => String)
  file_name: string;

  @Field(() => Boolean, { nullable: true })
  secure?: boolean;
}
