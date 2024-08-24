import { FileUpload, GraphQLUpload } from '@/graphql-upload';
import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class UpdateCoreAdminLanguagesArgs {
  @Field(() => String)
  code: string;

  @Field(() => GraphQLUpload)
  file: Promise<FileUpload>;
}
