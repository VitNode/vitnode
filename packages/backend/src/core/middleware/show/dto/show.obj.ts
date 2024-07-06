import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

import { AllowTypeFilesEnum } from '../../../../providers/config';

registerEnumType(AllowTypeFilesEnum, {
  name: 'AllowTypeFilesEnum',
});

@ObjectType()
export class RebuildRequiredEditorShowCoreMiddleware {
  @Field(() => Boolean)
  langs: boolean;

  @Field(() => Boolean)
  plugins: boolean;
}

@ObjectType()
export class FilesEditorShowCoreMiddleware {
  @Field(() => AllowTypeFilesEnum)
  allow_type: AllowTypeFilesEnum;
}

@ObjectType()
export class EditorShowCoreMiddleware {
  @Field(() => Boolean)
  sticky: boolean;

  @Field(() => FilesEditorShowCoreMiddleware)
  files: FilesEditorShowCoreMiddleware;
}

@ObjectType()
export class LanguagesCoreMiddleware {
  @Field(() => String)
  code: string;

  @Field(() => Boolean)
  enabled: boolean;

  @Field(() => Boolean)
  default: boolean;
}

@ObjectType()
export class ShowCoreMiddlewareObj {
  @Field(() => [LanguagesCoreMiddleware])
  languages: LanguagesCoreMiddleware[];

  @Field(() => [String])
  plugins: string[];

  @Field(() => EditorShowCoreMiddleware)
  editor: EditorShowCoreMiddleware;

  @Field(() => RebuildRequiredEditorShowCoreMiddleware)
  rebuild_required: RebuildRequiredEditorShowCoreMiddleware;
}
