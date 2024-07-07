import { ArgsType, Field } from '@nestjs/graphql';

import { FileUpload, GraphQLUpload } from '@/graphql-upload';

@ArgsType()
export class UploadAdminPluginsArgs {
  @Field(() => GraphQLUpload)
  file: Promise<FileUpload>;

  @Field(() => String, { nullable: true })
  code: string | null;
}
