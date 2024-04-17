import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ShowAdminManifestMetadataObj {
  @Field(() => String)
  display: string;
}
