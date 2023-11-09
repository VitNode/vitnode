import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum LayoutAdminInstallEnum {
  DATABASE = 'DATABASE',
  ACCOUNT = 'ACCOUNT'
}

registerEnumType(LayoutAdminInstallEnum, {
  name: 'LayoutAdminInstallEnum'
});

@ObjectType()
export class LayoutAdminInstallObj {
  @Field(() => LayoutAdminInstallEnum)
  status: LayoutAdminInstallEnum;
}
