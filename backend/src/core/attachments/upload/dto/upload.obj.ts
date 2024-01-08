import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UploadCoreAttachmentsObj {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  module: string;

  @Field(() => Int)
  module_id: number;

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
  description: string | null;

  @Field(() => String)
  extension: string;

  @Field(() => Int)
  file_size: number;

  @Field(() => String)
  user_id: string;
}
