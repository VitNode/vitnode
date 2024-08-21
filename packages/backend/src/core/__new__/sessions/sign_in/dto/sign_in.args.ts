import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SignInSessionsCoreBody {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  remember?: boolean;

  @ApiPropertyOptional({ description: 'Sign in into AdminCP' })
  @IsBoolean()
  @IsOptional()
  admin?: boolean;
}
