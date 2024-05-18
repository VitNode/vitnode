import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class HslColor {
  @Field(() => Int)
  h: number;

  @Field(() => Int)
  s: number;

  @Field(() => Int)
  l: number;
}

@ObjectType()
class ThemeVariable {
  @Field(() => HslColor)
  light: HslColor;

  @Field(() => HslColor)
  dark: HslColor;
}

@ObjectType()
export class ShowCoreThemeEditor {
  @Field(() => ThemeVariable)
  primary: ThemeVariable;
}
