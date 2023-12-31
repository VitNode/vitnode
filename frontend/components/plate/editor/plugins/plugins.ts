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
import { createParagraphPlugin } from '@udecode/plate-paragraph';

import { BoldLeafEditor } from '../components/leaf/bold';
import { ItalicLeafEditor } from '../components/leaf/italic';
import { UnderlineLeafEditor } from '../components/leaf/underline';
import { StrikethroughLeafEditor } from '../components/leaf/strikethrough';
import { SubscriptLeafEditor } from '../components/leaf/subscript';
import { SuperscriptLeafEditor } from '../components/leaf/superscript';
import { CodeLeafEditor } from '../components/leaf/code';
import { HeadingElementEditor } from '../components/elements/heading';

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
    createHeadingPlugin()
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
      [ELEMENT_H1]: withProps(HeadingElementEditor, { heading: 'h1' }),
      [ELEMENT_H2]: withProps(HeadingElementEditor, { heading: 'h2' }),
      [ELEMENT_H3]: withProps(HeadingElementEditor, { heading: 'h3' }),
      [ELEMENT_H4]: withProps(HeadingElementEditor, { heading: 'h4' })
    }
  }
);
