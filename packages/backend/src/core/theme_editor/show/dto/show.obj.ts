import { UploadCoreFilesObj } from '@/core/files/helpers/upload/dto/upload.obj';
import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class HslColor {
  @Field(() => Int)
  h: number;

  @Field(() => Int)
  l: number;

  @Field(() => Int)
  s: number;
}

@ObjectType()
class ThemeVariable {
  @Field(() => HslColor)
  dark: HslColor;

  @Field(() => HslColor)
  light: HslColor;
}

@ObjectType()
export class ColorsShowCoreThemeEditor {
  @Field(() => ThemeVariable)
  accent: ThemeVariable;

  @Field(() => ThemeVariable)
  accent_foreground: ThemeVariable;

  @Field(() => ThemeVariable)
  background: ThemeVariable;

  @Field(() => ThemeVariable)
  border: ThemeVariable;

  @Field(() => ThemeVariable)
  card: ThemeVariable;

  @Field(() => ThemeVariable)
  cover: ThemeVariable;

  @Field(() => ThemeVariable)
  cover_foreground: ThemeVariable;

  @Field(() => ThemeVariable)
  destructive: ThemeVariable;

  @Field(() => ThemeVariable)
  destructive_foreground: ThemeVariable;

  @Field(() => ThemeVariable)
  muted: ThemeVariable;

  @Field(() => ThemeVariable)
  muted_foreground: ThemeVariable;

  @Field(() => ThemeVariable)
  primary: ThemeVariable;

  @Field(() => ThemeVariable)
  primary_foreground: ThemeVariable;

  @Field(() => ThemeVariable)
  secondary: ThemeVariable;

  @Field(() => ThemeVariable)
  secondary_foreground: ThemeVariable;
}

@ObjectType()
export class LogoShowCoreThemeEditor {
  @Field(() => UploadCoreFilesObj, { nullable: true })
  dark?: UploadCoreFilesObj;

  @Field(() => UploadCoreFilesObj, { nullable: true })
  light?: UploadCoreFilesObj;

  @Field(() => UploadCoreFilesObj, { nullable: true })
  mobile_dark?: UploadCoreFilesObj;

  @Field(() => UploadCoreFilesObj, { nullable: true })
  mobile_light?: UploadCoreFilesObj;

  @Field(() => Float)
  mobile_width: number;

  @Field(() => String)
  text: string;

  @Field(() => Float)
  width: number;
}

@ObjectType()
export class ShowCoreThemeEditorObj {
  @Field(() => ColorsShowCoreThemeEditor, { nullable: true })
  colors?: ColorsShowCoreThemeEditor;

  @Field(() => LogoShowCoreThemeEditor)
  logos: LogoShowCoreThemeEditor;
}
