import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UploadCoreAttachmentsObj {
  @Field(() => String)
  module: string;

  @Field(() => String)
  module_id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  mimetype: string;

  @Field(() => String)
  url: string;

  @Field(() => Int)
  created: number;

  @Field(() => Int)
  position: number;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String)
  extension: string;

  @Field(() => Int)
  file_size: number;

  @Field(() => String)
  member_id: string;
}
