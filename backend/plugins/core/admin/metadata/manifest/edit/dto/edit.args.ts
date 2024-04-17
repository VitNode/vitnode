import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export class EditAdminManifestMetadataObj {
  @Field(() => String)
  display: string;

  @Field(() => String)
  start_url: string;
}
