import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';

import { FileUpload, GraphQLUpload } from '@/graphql-upload';

@InputType()
export class HslColorInput {
  @Field(() => Int)
  h: number;

  @Field(() => Int)
  s: number;

  @Field(() => Int)
  l: number;
}

@InputType()
export class ThemeVariableInput {
  @Field(() => HslColorInput)
  light: HslColorInput;

  @Field(() => HslColorInput)
  dark: HslColorInput;
}

@InputType()
class ColorsEditAdminThemeEditor {
  @Field(() => ThemeVariableInput)
  primary: ThemeVariableInput;

  @Field(() => ThemeVariableInput)
  primary_foreground: ThemeVariableInput;

  @Field(() => ThemeVariableInput)
  secondary: ThemeVariableInput;

  @Field(() => ThemeVariableInput)
  secondary_foreground: ThemeVariableInput;

  @Field(() => ThemeVariableInput)
  background: ThemeVariableInput;

  @Field(() => ThemeVariableInput)
  destructive: ThemeVariableInput;

  @Field(() => ThemeVariableInput)
  destructive_foreground: ThemeVariableInput;

  @Field(() => ThemeVariableInput)
  cover: ThemeVariableInput;

  @Field(() => ThemeVariableInput)
  cover_foreground: ThemeVariableInput;

  @Field(() => ThemeVariableInput)
  muted: ThemeVariableInput;

  @Field(() => ThemeVariableInput)
  muted_foreground: ThemeVariableInput;

  @Field(() => ThemeVariableInput)
  accent: ThemeVariableInput;

  @Field(() => ThemeVariableInput)
  accent_foreground: ThemeVariableInput;

  @Field(() => ThemeVariableInput)
  card: ThemeVariableInput;

  @Field(() => ThemeVariableInput)
  border: ThemeVariableInput;
}

@InputType()
class LogosEditAdminThemeEditor {
  @Field(() => Int)
  width: number;

  @Field(() => Int)
  mobile_width: number;

  @Field()
  text: string;

  @Field(() => GraphQLUpload, { nullable: true })
  dark?: Promise<FileUpload>;

  @Field(() => GraphQLUpload, { nullable: true })
  light?: Promise<FileUpload>;
}

@ArgsType()
export class EditAdminThemeEditorArgs {
  @Field(() => ColorsEditAdminThemeEditor, { nullable: true })
  colors?: ColorsEditAdminThemeEditor;

  @Field(() => LogosEditAdminThemeEditor)
  logos: LogosEditAdminThemeEditor;
}
