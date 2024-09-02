import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class EditAdminManifestMetadataObj {
  @Field(() => String)
  background_color: string;

  @Field(() => String)
  display: string;

  @Field(() => String)
  start_url: string;

  @Field(() => String)
  theme_color: string;
}
