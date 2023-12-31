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
import { createPlugins } from '@udecode/plate-common';
import { withProps } from '@udecode/cn';
import {
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  createHeadingPlugin
} from '@udecode/plate-heading';
import { ELEMENT_PARAGRAPH, createParagraphPlugin } from '@udecode/plate-paragraph';
import { createIndentPlugin } from '@udecode/plate-indent';
import { createIndentListPlugin } from '@udecode/plate-indent-list';
import { createAutoformatPlugin } from '@udecode/plate-autoformat';
import { ELEMENT_OL, ELEMENT_UL, createListPlugin } from '@udecode/plate-list';
import { ELEMENT_BLOCKQUOTE } from '@udecode/plate-block-quote';
import { ELEMENT_CODE_BLOCK } from '@udecode/plate-code-block';

import { BoldLeafEditor } from '../components/leaf/bold';
import { ItalicLeafEditor } from '../components/leaf/italic';
import { UnderlineLeafEditor } from '../components/leaf/underline';
import { StrikethroughLeafEditor } from '../components/leaf/strikethrough';
import { SubscriptLeafEditor } from '../components/leaf/subscript';
import { SuperscriptLeafEditor } from '../components/leaf/superscript';
import { CodeLeafEditor } from '../components/leaf/code';
import { ListElement } from '@/components/plate-ui/list-element';
import { HeadingElement } from '@/components/plate-ui/heading-element';
import { ParagraphElement } from '@/components/plate-ui/paragraph-element';

export const pluginsEditor = createPlugins(
  [
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
    createIndentPlugin({
      inject: {
        props: {
          validTypes: [ELEMENT_PARAGRAPH, ELEMENT_H1]
        }
      }
    }),
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
    createAutoformatPlugin()
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
      [ELEMENT_PARAGRAPH]: ParagraphElement
    }
  }
);
