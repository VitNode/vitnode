import { AllowTypeFilesEnum, CaptchaTypeEnum } from '@/providers';
import { ApiProperty } from '@nestjs/swagger';

export class AuthorizationCoreMiddleware {
  @ApiProperty()
  force_login: boolean;

  @ApiProperty()
  lock_register: boolean;
}

export class LanguagesCoreMiddleware {
  @ApiProperty()
  code: string;

  @ApiProperty()
  default: boolean;

  @ApiProperty()
  enabled: boolean;
}

export class FilesEditorShowCoreMiddleware {
  @ApiProperty({ enum: AllowTypeFilesEnum, enumName: 'AllowTypeFilesEnum' })
  allow_type: AllowTypeFilesEnum;
}

export class EditorShowCoreMiddleware {
  @ApiProperty()
  files: FilesEditorShowCoreMiddleware;

  @ApiProperty()
  sticky: boolean;
}

export class CaptchaSecurityCoreMiddleware {
  @ApiProperty()
  site_key: string;

  @ApiProperty({ enum: CaptchaTypeEnum, enumName: 'CaptchaTypeEnum' })
  type: CaptchaTypeEnum;
}

export class SecurityCoreMiddleware {
  @ApiProperty()
  captcha: CaptchaSecurityCoreMiddleware;
}

export class ShowCoreMiddlewareObj {
  @ApiProperty()
  authorization: AuthorizationCoreMiddleware;

  @ApiProperty()
  editor: EditorShowCoreMiddleware;

  @ApiProperty()
  is_ai_enabled: boolean;

  @ApiProperty()
  is_email_enabled: boolean;

  @ApiProperty()
  languages: LanguagesCoreMiddleware[];

  @ApiProperty({ example: ['welcome', 'blog'] })
  plugins: string[];

  @ApiProperty()
  security: SecurityCoreMiddleware;
}
