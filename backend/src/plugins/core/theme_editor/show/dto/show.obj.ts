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
export class ColorsShowCoreThemeEditor {
  @Field(() => ThemeVariable)
  primary: ThemeVariable;

  @Field(() => ThemeVariable)
  primary_foreground: ThemeVariable;

  @Field(() => ThemeVariable)
  secondary: ThemeVariable;

  @Field(() => ThemeVariable)
  background: ThemeVariable;
}

@ObjectType()
export class ShowCoreThemeEditor {
  @Field(() => ColorsShowCoreThemeEditor)
  colors: ColorsShowCoreThemeEditor;
}
