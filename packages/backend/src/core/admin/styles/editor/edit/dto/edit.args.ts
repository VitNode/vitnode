import { ArgsType, Field, InputType } from '@nestjs/graphql';

import { AllowTypeFilesEnum } from '../../../../../../providers/config';

@InputType()
class FilesEditAdminEditorStyles {
  @Field(() => AllowTypeFilesEnum)
  allow_type: AllowTypeFilesEnum;
}

@ArgsType()
export class EditAdminEditorStylesArgs {
  @Field(() => Boolean)
  sticky: boolean;

  @Field(() => FilesEditAdminEditorStyles)
  files: FilesEditAdminEditorStyles;
}
