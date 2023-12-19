import type { EditorThemeClasses } from 'lexical';

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
    underlineStrikethrough: `${PREFIX}_text--underlineStrikethrough`,
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
  code: `${PREFIX}_code`,
  codeHighlight: {
    atrule: `${PREFIX}_code--atrule`,
    attr: `${PREFIX}_code--attr`,
    boolean: `${PREFIX}_code--boolean`,
    builtin: `${PREFIX}_code--builtin`,
    cdata: `${PREFIX}_code--cdata`,
    char: `${PREFIX}_code--char`,
    class: `${PREFIX}_code--class`,
    'class-name': `${PREFIX}_code--class-name`,
    comment: `${PREFIX}_code--comment`,
    constant: `${PREFIX}_code--constant`,
    deleted: `${PREFIX}_code--deleted`,
    doctype: `${PREFIX}_code--doctype`,
    entity: `${PREFIX}_code--entity`,
    function: `${PREFIX}_code--function`,
    important: `${PREFIX}_code--important`,
    inserted: `${PREFIX}_code--inserted`,
    keyword: `${PREFIX}_code--keyword`,
    namespace: `${PREFIX}_code--namespace`,
    number: `${PREFIX}_code--number`,
    operator: `${PREFIX}_code--operator`,
    prolog: `${PREFIX}_code--prolog`,
    property: `${PREFIX}_code--property`,
    punctuation: `${PREFIX}_code--punctuation`,
    regex: `${PREFIX}_code--regex`,
    selector: `${PREFIX}_code--selector`,
    string: `${PREFIX}_code--string`,
    symbol: `${PREFIX}_code--symbol`,
    tag: `${PREFIX}_code--tag`,
    url: `${PREFIX}_code--url`,
    variable: `${PREFIX}_code--variable`
  }
};
