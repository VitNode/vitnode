import { UploadWithKeepCoreFilesArgs } from '@/core/files/helpers/upload/upload.dto';
import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class EditAdminEmailSettingsServiceArgs {
  @Field(() => String)
  color_primary: string;

  @Field(() => String)
  color_primary_foreground: string;

  @Field(() => UploadWithKeepCoreFilesArgs, { nullable: true })
  logo?: UploadWithKeepCoreFilesArgs;
}
