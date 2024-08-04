import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';

import { EmailProvider } from '@/providers';
import { UploadWithKeepCoreFilesArgs } from '@/core/files/helpers/upload/dto/upload.args';

@InputType()
export class SMTPEditAdminEmailSettingsService {
  @Field(() => String)
  host: string;

  @Field(() => String)
  user: string;

  @Field(() => String)
  password: string;

  @Field(() => Int)
  port: number;

  @Field(() => Boolean)
  secure: boolean;
}

@ArgsType()
export class EditAdminEmailSettingsServiceArgs {
  @Field(() => EmailProvider)
  provider: EmailProvider;

  @Field(() => SMTPEditAdminEmailSettingsService, { nullable: true })
  smtp?: SMTPEditAdminEmailSettingsService;

  @Field(() => String, { nullable: true })
  resend_key?: string;

  @Field(() => UploadWithKeepCoreFilesArgs, { nullable: true })
  logo?: UploadWithKeepCoreFilesArgs;

  @Field(() => String)
  color_primary: string;

  @Field(() => String)
  color_primary_foreground: string;
}
