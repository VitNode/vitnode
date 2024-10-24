import { ApiProperty } from '@nestjs/swagger';

export class AuthorizationMiddleware {
  @ApiProperty()
  force_login: boolean;

  @ApiProperty()
  lock_register: boolean;
}

export class LanguagesMiddleware {
  @ApiProperty()
  code: string;

  @ApiProperty()
  default: boolean;

  @ApiProperty()
  enabled: boolean;
}

export class ShowMiddlewareObj {
  @ApiProperty()
  authorization: AuthorizationMiddleware;

  @ApiProperty()
  is_ai_enabled: boolean;

  @ApiProperty()
  is_email_enabled: boolean;

  @ApiProperty({ example: [{ code: 'en', default: true, enabled: true }] })
  languages: LanguagesMiddleware[];

  @ApiProperty({ example: ['core', 'admin'] })
  plugins: string[];
}
