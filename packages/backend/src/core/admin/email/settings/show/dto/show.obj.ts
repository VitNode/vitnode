import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ShowAdminEmailSettingsServiceObj {
  @Field(() => String)
  smtp_host: string;

  @Field(() => String)
  smtp_user: string;

  @Field(() => Int)
  smtp_port: number;

  @Field(() => Boolean)
  smtp_secure: boolean;

  @Field(() => String)
  color_primary: string;
}
