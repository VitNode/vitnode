import { ApiProperty } from '@nestjs/swagger';

export class StringLanguageInput {
  @ApiProperty()
  language_code: string;

  @ApiProperty()
  value: string;
}
