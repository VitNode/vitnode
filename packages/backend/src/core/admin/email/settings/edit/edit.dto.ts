import { UploadWithKeepCoreFilesArgs } from '@/core/files/helpers/upload/upload.dto';
import { EmailProvider } from '@/providers';
import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class SMTPEditAdminEmailSettingsService {
  @Field(() => String)
  host: string;

  @Field(() => String)
  password: string;

  @Field(() => Int)
  port: number;

  @Field(() => Boolean)
  secure: boolean;

  @Field(() => String)
  user: string;
}

@ArgsType()
export class EditAdminEmailSettingsServiceArgs {
  @Field(() => String)
  color_primary: string;

  @Field(() => String)
  color_primary_foreground: string;

  @Field(() => String)
  from: string;

  @Field(() => UploadWithKeepCoreFilesArgs, { nullable: true })
  logo?: UploadWithKeepCoreFilesArgs;

  @Field(() => EmailProvider)
  provider: EmailProvider;

  @Field(() => String, { nullable: true })
  resend_key?: string;

  @Field(() => SMTPEditAdminEmailSettingsService, { nullable: true })
  smtp?: SMTPEditAdminEmailSettingsService;
}
