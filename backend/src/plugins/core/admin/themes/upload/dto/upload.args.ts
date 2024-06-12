import { ArgsType, Field, Int } from "@nestjs/graphql";
import { FileUpload, GraphQLUpload } from "@vitnode/backend";

@ArgsType()
export class UploadAdminThemesArgs {
  @Field(() => GraphQLUpload)
  file: Promise<FileUpload>;

  @Field(() => Int, { nullable: true })
  id: number | null;
}
