import { UploadWithKeepCoreFilesArgs } from '@/core/files/helpers/upload/dto/upload.args';
import { ArgsType, Field, Float, InputType, Int } from '@nestjs/graphql';

@InputType()
export class HslColorInput {
  @Field(() => Int)
  h: number;

  @Field(() => Int)
  l: number;

  @Field(() => Int)
  s: number;
}

@InputType()
export class ThemeVariableInput {
  @Field(() => HslColorInput)
  dark: HslColorInput;

  @Field(() => HslColorInput)
  light: HslColorInput;
}

@InputType()
class ColorsEditAdminThemeEditor {
  @Field(() => ThemeVariableInput)
  accent: ThemeVariableInput;

  @Field(() => ThemeVariableInput)
  accent_foreground: ThemeVariableInput;

  @Field(() => ThemeVariableInput)
  background: ThemeVariableInput;

  @Field(() => ThemeVariableInput)
  border: ThemeVariableInput;

  @Field(() => ThemeVariableInput)
  card: ThemeVariableInput;

  @Field(() => ThemeVariableInput)
  cover: ThemeVariableInput;

  @Field(() => ThemeVariableInput)
  cover_foreground: ThemeVariableInput;

  @Field(() => ThemeVariableInput)
  destructive: ThemeVariableInput;

  @Field(() => ThemeVariableInput)
  destructive_foreground: ThemeVariableInput;

  @Field(() => ThemeVariableInput)
  muted: ThemeVariableInput;

  @Field(() => ThemeVariableInput)
  muted_foreground: ThemeVariableInput;

  @Field(() => ThemeVariableInput)
  primary: ThemeVariableInput;

  @Field(() => ThemeVariableInput)
  primary_foreground: ThemeVariableInput;

  @Field(() => ThemeVariableInput)
  secondary: ThemeVariableInput;

  @Field(() => ThemeVariableInput)
  secondary_foreground: ThemeVariableInput;
}

@InputType()
class LogosEditAdminThemeEditor {
  @Field(() => UploadWithKeepCoreFilesArgs, { nullable: true })
  dark?: UploadWithKeepCoreFilesArgs;

  @Field(() => UploadWithKeepCoreFilesArgs, { nullable: true })
  light?: UploadWithKeepCoreFilesArgs;

  @Field(() => UploadWithKeepCoreFilesArgs, { nullable: true })
  mobile_dark?: UploadWithKeepCoreFilesArgs;

  @Field(() => UploadWithKeepCoreFilesArgs, { nullable: true })
  mobile_light?: UploadWithKeepCoreFilesArgs;

  @Field(() => Float)
  mobile_width: number;

  @Field()
  text: string;

  @Field(() => Float)
  width: number;
}

@ArgsType()
export class EditAdminThemeEditorArgs {
  @Field(() => ColorsEditAdminThemeEditor, { nullable: true })
  colors?: ColorsEditAdminThemeEditor;

  @Field(() => LogosEditAdminThemeEditor)
  logos: LogosEditAdminThemeEditor;
}
