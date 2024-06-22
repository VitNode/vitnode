import { ArgsType, Field } from "@nestjs/graphql";

import { FileUpload, GraphQLUpload } from "../../../../../graphql-upload";

@ArgsType()
export class UploadCoreFilesArgs {
  @Field(() => [GraphQLUpload])
  files: Promise<FileUpload>[];

  @Field(() => Number)
  maxUploadSizeBytes: number;

  @Field(() => [String])
  acceptMimeType: string[];

  @Field(() => String)
  plugin: string;

  @Field(() => String)
  folder: string;

  @Field(() => Boolean, { nullable: true })
  secure?: boolean | null;
}
