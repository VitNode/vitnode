import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum LayoutAdminInstallEnum {
  ACCOUNT = 'ACCOUNT',
  DATABASE = 'DATABASE',
  FINISH = 'FINISH',
}

registerEnumType(LayoutAdminInstallEnum, {
  name: 'LayoutAdminInstallEnum',
});

@ObjectType()
export class LayoutAdminInstallObj {
  @Field(() => LayoutAdminInstallEnum)
  status: LayoutAdminInstallEnum;
}
