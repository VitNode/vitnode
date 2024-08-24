import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ShowAdminManifestMetadataObj {
  @Field(() => String)
  background_color: string;

  @Field(() => String)
  display: string;

  @Field(() => String)
  id: string;

  @Field(() => String)
  lang: string;

  @Field(() => String)
  start_url: string;

  @Field(() => String)
  theme_color: string;
}
