import { IsInt, IsOptional } from 'class-validator';

export class ShowCoreNavBody {
  @IsInt()
  @IsOptional()
  cursor?: number;

  @IsInt()
  @IsOptional()
  first?: number;

  @IsInt()
  @IsOptional()
  last?: number;
}
