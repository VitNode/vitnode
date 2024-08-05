import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';

import { EmailProvider } from '@/providers';
import { UploadCoreFilesObj } from '@/core/files/helpers/upload/dto/upload.obj';

registerEnumType(EmailProvider, {
  name: 'EmailProvider',
});

@ObjectType()
export class ShowAdminEmailSettingsServiceObj {
  @Field(() => String, { nullable: true })
  smtp_host: string | null;

  @Field(() => String, { nullable: true })
  smtp_user: string | null;

  @Field(() => Int, { nullable: true })
  smtp_port: number | null;

  @Field(() => Boolean, { nullable: true })
  smtp_secure: boolean | null;

  @Field(() => EmailProvider)
  provider: EmailProvider;

  @Field(() => UploadCoreFilesObj, { nullable: true })
  logo?: UploadCoreFilesObj;

  @Field(() => String)
  color_primary: string;
}
