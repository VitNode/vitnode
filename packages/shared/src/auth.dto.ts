import { ApiProperty } from '@nestjs/swagger';

export class ShowAuthObj {
  @ApiProperty()
  plugin_code_default: string;
}
