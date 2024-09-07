import { StringLanguageInput, TransformStringLanguageInput } from '@/utils';
import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { ArrayMinSize, Min } from 'class-validator';

@InputType()
export class ContentCreateAdminGroups {
  @Field(() => Boolean)
  files_allow_upload: boolean;

  @Field(() => Int)
  @Min(-1)
  files_max_storage_for_submit: number;

  @Field(() => Int)
  @Min(-1)
  files_total_max_storage: number;
}

@ArgsType()
export class CreateAdminGroupsArgs {
  @Field(() => String, { nullable: true })
  color?: string;

  @Field(() => ContentCreateAdminGroups)
  content: ContentCreateAdminGroups;

  @ArrayMinSize(1)
  @Transform(TransformStringLanguageInput)
  @Field(() => [StringLanguageInput])
  name: StringLanguageInput[];
}
