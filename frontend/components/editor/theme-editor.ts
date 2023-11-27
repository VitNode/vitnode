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
    strikethrough: 'line-through',
    code: 'font-mono bg-muted rounded-md p-1.5'
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
  rtl: 'text-right',
  code: 'font-mono bg-muted rounded-md p-2 pl-14 block relative before:content-[attr(data-gutter)] before:absolute before:top-0 before:left-0 before:min-w-[3rem] before:text-right before:whitespace-pre-wrap before:py-2 before:px-1 before:bg-background/40 before:border-r before:border-input before:text-muted-foreground'
};
