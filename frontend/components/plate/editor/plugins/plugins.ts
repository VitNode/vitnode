import {
  MARK_BOLD,
  MARK_CODE,
  MARK_ITALIC,
  MARK_STRIKETHROUGH,
  MARK_SUBSCRIPT,
  MARK_SUPERSCRIPT,
  MARK_UNDERLINE,
  createBoldPlugin,
  createCodePlugin,
  createItalicPlugin,
  createStrikethroughPlugin,
  createSubscriptPlugin,
  createSuperscriptPlugin,
  createUnderlinePlugin
} from '@udecode/plate-basic-marks';
import {
  createPlugins,
  PlateElement,
  type PlatePlugin,
  isBlockAboveEmpty,
  isSelectionAtBlockStart
} from '@udecode/plate-common';
import { withProps } from '@udecode/cn';
import {
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  KEYS_HEADING,
  createHeadingPlugin
} from '@udecode/plate-heading';
import { ELEMENT_PARAGRAPH, createParagraphPlugin } from '@udecode/plate-paragraph';
import { createIndentPlugin } from '@udecode/plate-indent';
import { createIndentListPlugin } from '@udecode/plate-indent-list';
import { createAutoformatPlugin, type AutoformatPlugin } from '@udecode/plate-autoformat';
import { ELEMENT_LI, ELEMENT_OL, ELEMENT_UL, createListPlugin } from '@udecode/plate-list';
import { ELEMENT_BLOCKQUOTE } from '@udecode/plate-block-quote';
import { createAlignPlugin } from '@udecode/plate-alignment';
import { createExitBreakPlugin, createSoftBreakPlugin } from '@udecode/plate-break';
import {
  ELEMENT_CODE_BLOCK,
  ELEMENT_CODE_LINE,
  ELEMENT_CODE_SYNTAX,
  createCodeBlockPlugin,
  isCodeBlockEmpty,
  isSelectionAtCodeBlockStart,
  unwrapCodeBlock
} from '@udecode/plate-code-block';
import { createResetNodePlugin } from '@udecode/plate-reset-node';
import { createComboboxPlugin } from '@udecode/plate-combobox';
import { createEmojiPlugin } from '@udecode/plate-emoji';
import {
  createFontBackgroundColorPlugin,
  createFontColorPlugin,
  createFontSizePlugin
} from '@udecode/plate-font';
import { ELEMENT_TD } from '@udecode/plate-table';

import { ListElement } from '@/components/plate-ui/list-element';
import { HeadingElement } from '@/components/plate-ui/heading-element';
import { ParagraphElement } from '@/components/plate-ui/paragraph-element';
import { autoformatRules } from './format/format';
import { EmojiCombobox } from '@/components/plate-ui/emoji/emoji-combobox';
import { CodeBlockElement } from '@/components/plate-ui/code/code-block';
import { CodeLineElement } from '@/components/plate-ui/code/code-line-element';
import { CodeSyntaxLeaf } from '@/components/plate-ui/code/code-syntax-leaf';

import { BoldLeafEditor } from '../../../plate-ui/basic/bold';
import { ItalicLeafEditor } from '../../../plate-ui/basic/italic';
import { UnderlineLeafEditor } from '../../../plate-ui/basic/underline';
import { StrikethroughLeafEditor } from '../../../plate-ui/basic/strikethrough';
import { SubscriptLeafEditor } from '../../../plate-ui/basic/subscript';
import { SuperscriptLeafEditor } from '../../../plate-ui/basic/superscript';
import { CodeLeafEditor } from '../../../plate-ui/basic/code';

const autoformatPlugin: Partial<PlatePlugin<AutoformatPlugin>> = {
  options: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    rules: autoformatRules as unknown,
    enableUndoOnDelete: true
  }
};

const resetBlockTypesCommonRule = {
  types: [ELEMENT_BLOCKQUOTE],
  defaultType: ELEMENT_PARAGRAPH
};

const resetBlockTypesCodeBlockRule = {
  types: [ELEMENT_CODE_BLOCK],
  defaultType: ELEMENT_PARAGRAPH,
  onReset: unwrapCodeBlock
};

export const pluginsEditor = createPlugins(
  [
    createSoftBreakPlugin({
      options: {
        rules: [
          { hotkey: 'shift+enter' },
          {
            hotkey: 'enter',
            query: {
              allow: [ELEMENT_CODE_BLOCK, ELEMENT_BLOCKQUOTE, ELEMENT_TD]
            }
          }
        ]
      }
    }),
    createExitBreakPlugin({
      options: {
        rules: [
          {
            hotkey: 'mod+enter'
          },
          {
            hotkey: 'mod+shift+enter',
            before: true
          },
          {
            hotkey: 'enter',
            query: {
              start: true,
              end: true,
              allow: KEYS_HEADING
            },
            relative: true,
            level: 1
          }
        ]
      }
    }),
    createCodeBlockPlugin(),
    createFontColorPlugin(),
    createFontBackgroundColorPlugin(),
    createFontSizePlugin(),
    createAlignPlugin({
      inject: {
        props: {
          validTypes: [ELEMENT_PARAGRAPH, ELEMENT_H1, ELEMENT_H2, ELEMENT_H3, ELEMENT_H4]
        }
      }
    }),
    createComboboxPlugin(),
    createEmojiPlugin({
      renderAfterEditable: EmojiCombobox
    }),
    createBoldPlugin(),
    createItalicPlugin(),
    createUnderlinePlugin(),
    createStrikethroughPlugin(),
    createSubscriptPlugin(),
    createSuperscriptPlugin(),
    createCodePlugin(),
    createParagraphPlugin(),
    createHeadingPlugin(),
    createListPlugin(),
    createIndentListPlugin({
      inject: {
        props: {
          validTypes: [ELEMENT_PARAGRAPH, ELEMENT_H1]
        }
      }
    }),
    createIndentPlugin({
      inject: {
        props: {
          validTypes: [
            ELEMENT_PARAGRAPH,
            ELEMENT_H1,
            ELEMENT_H2,
            ELEMENT_H3,
            ELEMENT_BLOCKQUOTE,
            ELEMENT_CODE_BLOCK
          ]
        }
      }
    }),
    createIndentListPlugin({
      inject: {
        props: {
          validTypes: [
            ELEMENT_PARAGRAPH,
            ELEMENT_H1,
            ELEMENT_H2,
            ELEMENT_H3,
            ELEMENT_BLOCKQUOTE,
            ELEMENT_CODE_BLOCK
          ]
        }
      }
    }),
    createAutoformatPlugin(autoformatPlugin),
    createResetNodePlugin({
      options: {
        rules: [
          {
            ...resetBlockTypesCommonRule,
            hotkey: 'Enter',
            predicate: isBlockAboveEmpty
          },
          {
            ...resetBlockTypesCommonRule,
            hotkey: 'Backspace',
            predicate: isSelectionAtBlockStart
          },
          {
            ...resetBlockTypesCodeBlockRule,
            hotkey: 'Enter',
            predicate: isCodeBlockEmpty
          },
          {
            ...resetBlockTypesCodeBlockRule,
            hotkey: 'Backspace',
            predicate: isSelectionAtCodeBlockStart
          }
        ]
      }
    })
  ],
  {
    components: {
      [MARK_BOLD]: BoldLeafEditor,
      [MARK_ITALIC]: ItalicLeafEditor,
      [MARK_UNDERLINE]: UnderlineLeafEditor,
      [MARK_STRIKETHROUGH]: StrikethroughLeafEditor,
      [MARK_SUBSCRIPT]: SubscriptLeafEditor,
      [MARK_SUPERSCRIPT]: SuperscriptLeafEditor,
      [MARK_CODE]: CodeLeafEditor,
      [ELEMENT_H1]: withProps(HeadingElement, { variant: 'h1' }),
      [ELEMENT_H2]: withProps(HeadingElement, { variant: 'h2' }),
      [ELEMENT_H3]: withProps(HeadingElement, { variant: 'h3' }),
      [ELEMENT_H4]: withProps(HeadingElement, { variant: 'h4' }),
      [ELEMENT_UL]: withProps(ListElement, { variant: 'ul' }),
      [ELEMENT_OL]: withProps(ListElement, { variant: 'ol' }),
      [ELEMENT_LI]: withProps(PlateElement, { as: 'li' }),
      [ELEMENT_PARAGRAPH]: ParagraphElement,
      [ELEMENT_CODE_BLOCK]: CodeBlockElement,
      [ELEMENT_CODE_LINE]: CodeLineElement,
      [ELEMENT_CODE_SYNTAX]: CodeSyntaxLeaf
    }
  }
);
