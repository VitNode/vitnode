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
  secondary_foreground: ThemeVariable;

  @Field(() => ThemeVariable)
  background: ThemeVariable;

  @Field(() => ThemeVariable)
  destructive: ThemeVariable;

  @Field(() => ThemeVariable)
  destructive_foreground: ThemeVariable;

  @Field(() => ThemeVariable)
  cover: ThemeVariable;

  @Field(() => ThemeVariable)
  cover_foreground: ThemeVariable;

  @Field(() => ThemeVariable)
  muted: ThemeVariable;

  @Field(() => ThemeVariable)
  muted_foreground: ThemeVariable;

  @Field(() => ThemeVariable)
  accent: ThemeVariable;

  @Field(() => ThemeVariable)
  accent_foreground: ThemeVariable;

  @Field(() => ThemeVariable)
  card: ThemeVariable;

  @Field(() => ThemeVariable)
  border: ThemeVariable;
}

@ObjectType()
export class ShowCoreThemeEditorObj {
  @Field(() => ColorsShowCoreThemeEditor)
  colors: ColorsShowCoreThemeEditor;
}
