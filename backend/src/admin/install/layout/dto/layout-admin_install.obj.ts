import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum LayoutAdminInstallEnum {
  LICENSE = 'LICENSE',
  DATABASE = 'DATABASE',
  ADMIN = 'ADMIN'
}

registerEnumType(LayoutAdminInstallEnum, {
  name: 'LayoutAdminInstallEnum'
});

@ObjectType()
export class LayoutAdminInstallObj {
  @Field(() => LayoutAdminInstallEnum)
  status: LayoutAdminInstallEnum;
}
