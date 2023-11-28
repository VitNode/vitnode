import { useTranslations } from 'next-intl';
import { Options } from 'prettier';
import { format } from 'prettier/standalone';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getNearestNodeFromDOMNode } from 'lexical';
import { $isCodeNode } from '@lexical/code';
import * as prettierPluginBabel from 'prettier/plugins/babel';
import * as prettierPluginEstree from 'prettier/plugins/estree';

import { PrettierIcon } from './prettier-icon';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

const PRETTIER_OPTIONS_BY_LANG: Record<string, Options> = {
  css: {
    parser: 'css'
  },
  html: {
    parser: 'html'
  },
  js: {
    parser: 'babel'
  },
  markdown: {
    parser: 'markdown'
  }
};

const LANG_CAN_BE_PRETTIER = Object.keys(PRETTIER_OPTIONS_BY_LANG);

export const canBePrettier = (lang: string): boolean => {
  return LANG_CAN_BE_PRETTIER.includes(lang);
};

// export const getPrettierOptions = (lang: string): Options => {
//   const options = PRETTIER_OPTIONS_BY_LANG[lang];

//   if (!options) {
//     throw new Error(`CodeActionMenuPlugin: Prettier does not support this language: ${lang}`);
//   }

//   return {
//     ...options,
//     plugins: [parserBabel, prettierPluginEstree]
//   };
// };

// const loadPrettierFormat = async () => {
//   const { format } = await import('prettier/standalone');

//   return format;
// };

// const PRETTIER_PARSER_MODULES = {
//   css: () => import('prettier/parser-postcss'),
//   html: () => import('prettier/parser-html'),
//   js: () => import('prettier/parser-babel'),
//   markdown: () => import('prettier/parser-markdown')
// } as const;

// type LanguagesType = keyof typeof PRETTIER_PARSER_MODULES;

// const loadPrettierParserByLang = async (lang: string) => {
//   const dynamicImport = PRETTIER_PARSER_MODULES[lang as LanguagesType];

//   return await dynamicImport();
// };

interface Props {
  codeDOMNode: HTMLElement | null;
  lang: string;
}

export const PrettierButtonCodeAction = ({ codeDOMNode, lang }: Props) => {
  const t = useTranslations('core.editor.prettier');
  const [editor] = useLexicalComposerContext();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className="w-8 h-8 [&>svg]:pointer-events-none [&>svg]:fill-foreground [&>svg]:w-4 [&>svg]:h-4"
            variant="outline"
            size="icon"
            onClick={async () => {
              if (!codeDOMNode) return;

              try {
                let content = '';

                editor.update(() => {
                  const codeNode = $getNearestNodeFromDOMNode(codeDOMNode);
                  if (!$isCodeNode(codeNode)) return;

                  content = codeNode.getTextContent();
                });

                const parsed = await format(content, {
                  parser: 'babel',
                  plugins: [prettierPluginBabel, prettierPluginEstree]
                });

                if (parsed === '') return;

                editor.update(async () => {
                  const codeNode = $getNearestNodeFromDOMNode(codeDOMNode);
                  if (!$isCodeNode(codeNode)) return;

                  const selection = codeNode.select(0);
                  selection.insertText(parsed);
                });
              } catch (error) {
                // eslint-disable-next-line no-console
                console.error(error);
              }
            }}
          >
            <PrettierIcon />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">{t('format_code')}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
