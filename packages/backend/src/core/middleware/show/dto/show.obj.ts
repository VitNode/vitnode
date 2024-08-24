import { AllowTypeFilesEnum, CaptchaTypeEnum } from '@/providers/config';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

registerEnumType(AllowTypeFilesEnum, {
  name: 'AllowTypeFilesEnum',
});

registerEnumType(CaptchaTypeEnum, {
  name: 'CaptchaTypeEnum',
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
  @Field(() => FilesEditorShowCoreMiddleware)
  files: FilesEditorShowCoreMiddleware;

  @Field(() => Boolean)
  sticky: boolean;
}

@ObjectType()
export class LanguagesCoreMiddleware {
  @Field(() => String)
  code: string;

  @Field(() => Boolean)
  default: boolean;

  @Field(() => Boolean)
  enabled: boolean;
}

@ObjectType()
export class CaptchaSecurityCoreMiddleware {
  @Field(() => String)
  site_key: string;

  @Field(() => CaptchaTypeEnum)
  type: CaptchaTypeEnum;
}

@ObjectType()
export class SecurityCoreMiddleware {
  @Field(() => CaptchaSecurityCoreMiddleware)
  captcha: CaptchaSecurityCoreMiddleware;
}

@ObjectType()
export class AuthorizationCoreMiddleware {
  @Field(() => Boolean)
  force_login: boolean;
}

@ObjectType()
export class ShowCoreMiddlewareObj {
  @Field(() => AuthorizationCoreMiddleware)
  authorization: AuthorizationCoreMiddleware;

  @Field(() => EditorShowCoreMiddleware)
  editor: EditorShowCoreMiddleware;

  @Field(() => [LanguagesCoreMiddleware])
  languages: LanguagesCoreMiddleware[];

  @Field(() => [String])
  plugins: string[];

  @Field(() => RebuildRequiredEditorShowCoreMiddleware)
  rebuild_required: RebuildRequiredEditorShowCoreMiddleware;

  @Field(() => SecurityCoreMiddleware)
  security: SecurityCoreMiddleware;
}
