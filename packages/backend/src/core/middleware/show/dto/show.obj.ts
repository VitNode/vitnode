import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RebuildRequiredEditorShowCoreMiddleware {
  @Field(() => Boolean)
  langs: boolean;

  @Field(() => Boolean)
  plugins: boolean;
}

@ObjectType()
export class FilesEditorShowCoreMiddleware {
  @Field(() => String)
  allow_type: string;
}

@ObjectType()
export class EditorShowCoreMiddleware {
  @Field(() => String)
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
