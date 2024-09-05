import { FileUpload, GraphQLUpload } from '@/graphql-upload';
import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class UploadCoreEditorArgs {
  @Field(() => GraphQLUpload)
  file: Promise<FileUpload>;

  @Field(() => String)
  folder: string;

  @Field(() => String)
  plugin: string;
}
