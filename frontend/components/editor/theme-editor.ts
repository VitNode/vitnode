import type { EditorThemeClasses } from 'lexical';

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
    h4: 'text-xl'
  },
  text: {
    bold: 'font-bold',
    italic: 'italic',
    underline: 'underline',
    underlineStrikethrough: 'underline-strike-through',
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
  code: 'font-mono bg-muted rounded-md px-2 py-3 pl-14 block relative before:content-[attr(data-gutter)] before:absolute before:top-0 before:left-0 before:min-w-[3rem] before:text-right before:whitespace-pre-wrap before:py-3 before:px-1 before:bg-background/40 before:border-r before:border-input before:text-muted-foreground',
  codeHighlight: {
    atrule: 'text-orange-700 dark:text-orange-500',
    attr: 'text-pink-700 dark:text-pink-400',
    boolean: 'text-pink-700 dark:text-pink-400',
    builtin: 'text-teal-700 dark:text-teal-500',
    cdata: 'text-green-700 dark:text-green-500',
    char: 'text-green-700 dark:text-green-500',
    class: 'text-orange-700 dark:text-orange-500',
    'class-name': 'text-orange-700 dark:text-orange-500',
    comment: 'text-gray-600 dark:text-gray-400',
    constant: 'text-red-700 dark:text-red-400',
    deleted: 'text-red-700 dark:text-red-400',
    doctype: 'text-blue-600 dark:text-blue-400',
    entity: 'text-blue-600 dark:text-blue-400',
    function: 'text-blue-600 dark:text-blue-400',
    important: 'text-red-700 dark:text-red-400',
    inserted: 'text-blue-600 dark:text-blue-400',
    keyword: 'text-purple-600 dark:text-purple-400',
    namespace: 'text-blue-600 dark:text-blue-400',
    number: 'text-orange-700 dark:text-orange-500',
    operator: 'text-purple-600 dark:text-purple-400',
    prolog: 'text-blue-600 dark:text-blue-400',
    property: 'text-orange-700 dark:text-orange-500',
    punctuation: 'text-gray-600 dark:text-gray-400',
    regex: 'text-red-700 dark:text-red-400',
    selector: 'text-red-700 dark:text-red-400',
    string: 'text-green-700 dark:text-green-500',
    symbol: 'text-red-700 dark:text-red-400',
    tag: 'text-sky-700 dark:text-sky-500',
    url: 'text-green-700 dark:text-green-500',
    variable: 'text-orange-700 dark:text-orange-500'
  }
};
