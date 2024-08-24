import { AllowTypeFilesEnum } from '@/providers/config';
import { ArgsType, Field, InputType } from '@nestjs/graphql';

@InputType()
class FilesEditAdminEditorStyles {
  @Field(() => AllowTypeFilesEnum)
  allow_type: AllowTypeFilesEnum;
}

@ArgsType()
export class EditAdminEditorStylesArgs {
  @Field(() => FilesEditAdminEditorStyles)
  files: FilesEditAdminEditorStyles;

  @Field(() => Boolean)
  sticky: boolean;
}
