import { EditorThemeClasses } from 'lexical';

/**
 * ! IMPORTANT
 * ! This file is used to generate the theme editor
 * ! Do not modify this file !!!
 */

export const themeEditor: EditorThemeClasses = {
  heading: {
    h1: 'text-4xl',
    h2: 'text-3xl',
    h3: 'text-2xl',
    h4: 'text-xl',
    h5: 'text-lg',
    h6: 'text-base'
  },
  text: {
    bold: 'font-bold',
    italic: 'italic',
    underline: 'underline',
    strikethrough: 'line-through'
  },
  list: {
    ul: 'list-disc ml-6',
    ulDepth: ['list-disc', 'list-disc', 'list-disc', 'list-disc', 'list-disc'],
    ol: 'list-decimal ml-6',
    olDepth: ['list-decimal', 'list-decimal', 'list-decimal', 'list-decimal', 'list-decimal'],
    nested: {
      listitem: 'list-none'
    }
  },
  paragraph: 'my-2',
  ltr: 'text-left',
  rtl: 'text-right'
};
