import { ObjectType, OmitType } from "@nestjs/graphql";

import { ShowForumForumsWithChildren } from "../../../../../forum/forums/show/dto/show.obj";

@ObjectType()
export class CreateForumForumsObj extends OmitType(
  ShowForumForumsWithChildren,
  ["permissions"] as const
) {}
