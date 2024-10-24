import { ApiProperty } from '@nestjs/swagger';

export class StringLanguage {
  @ApiProperty()
  language_code: string;

  @ApiProperty()
  value: string;
}
