import { EditorThemeClasses } from 'lexical';

/**
 * ! IMPORTANT
 * ! This file is used to generate the theme editor
 * ! Do not modify this file !!!
 *
 * ? If you want to modify the theme editor, please modify the file: editor.scss
 */

const PREFIX = 'vitnode-editor';

export const themeEditor: EditorThemeClasses = {
  heading: {
    h1: `${PREFIX}_heading--1`,
    h2: `${PREFIX}_heading--2`,
    h3: `${PREFIX}_heading--3`
  },
  text: {
    bold: `${PREFIX}_text--bold`,
    italic: `${PREFIX}_text--italic`,
    underline: `${PREFIX}_text--underline`,
    strikethrough: `${PREFIX}_text--strikethrough`,
    code: `${PREFIX}_text--code`
  },
  list: {
    ul: `${PREFIX}_list--ul`,
    ulDepth: [
      `${PREFIX}_list--ulDepth`,
      `${PREFIX}_list--ulDepth`,
      `${PREFIX}_list--ulDepth`,
      `${PREFIX}_list--ulDepth`,
      `${PREFIX}_list--ulDepth`
    ],
    ol: `${PREFIX}_list--ol`,
    olDepth: [
      `${PREFIX}_list--olDepth`,
      `${PREFIX}_list--olDepth`,
      `${PREFIX}_list--olDepth`,
      `${PREFIX}_list--olDepth`,
      `${PREFIX}_list--olDepth`
    ],
    nested: {
      listitem: `${PREFIX}_list--nested-listitem`
    }
  },
  paragraph: `${PREFIX}_paragraph`,
  ltr: `${PREFIX}_ltr`,
  rtl: `${PREFIX}_rtl`,
  code: `${PREFIX}_code`
};
