import { FileUpload, GraphQLUpload } from '@/graphql-upload';
import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class UploadAdminPluginsArgs {
  @Field(() => String, { nullable: true })
  code: null | string;

  @Field(() => GraphQLUpload)
  file: Promise<FileUpload>;
}
