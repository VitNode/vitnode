import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ShowAdminManifestMetadataObj {
  @Field(() => String)
  display: string;

  @Field(() => String)
  lang: string;

  @Field(() => String)
  start_url: string;

  @Field(() => String)
  id: string;
}
