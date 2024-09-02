import { UploadCoreFilesObj } from '@/core/files/helpers/upload/upload.dto';
import { EmailProvider } from '@/providers';
import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';

registerEnumType(EmailProvider, {
  name: 'EmailProvider',
});

@ObjectType()
export class ShowAdminEmailSettingsServiceObj {
  @Field(() => String)
  color_primary: string;

  @Field(() => UploadCoreFilesObj, { nullable: true })
  logo?: UploadCoreFilesObj;

  @Field(() => EmailProvider)
  provider: EmailProvider;

  @Field(() => String, { nullable: true })
  smtp_host: null | string;

  @Field(() => Int, { nullable: true })
  smtp_port: null | number;

  @Field(() => Boolean, { nullable: true })
  smtp_secure: boolean | null;

  @Field(() => String, { nullable: true })
  smtp_user: null | string;
}
