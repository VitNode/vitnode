import { UploadCoreFilesObj } from '@/core/files/helpers/upload/upload.dto';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ShowAdminEmailSettingsServiceObj {
  @Field(() => String)
  color_primary: string;

  @Field(() => Boolean)
  is_enabled: boolean;

  @Field(() => UploadCoreFilesObj, { nullable: true })
  logo?: UploadCoreFilesObj;
}
