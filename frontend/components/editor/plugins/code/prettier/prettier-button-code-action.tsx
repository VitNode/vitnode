import { useTranslations } from "next-intl";
import type { Options } from "prettier";
import { format } from "prettier/standalone";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getNearestNodeFromDOMNode } from "lexical";
import { $isCodeNode } from "@lexical/code";
import * as prettierPluginBabel from "prettier/plugins/babel";
import * as prettierPluginEstree from "prettier/plugins/estree";
import * as prettierPluginMarkdown from "prettier/parser-markdown";
import * as prettierPluginHtml from "prettier/parser-html";
import * as prettierPluginCss from "prettier/parser-postcss";

import { PrettierIcon } from "./prettier-icon";
import { Button } from "@/components/ui/button";
import { useAlertDialog } from "@/components/ui/alert-dialog";

const PRETTIER_OPTIONS_BY_LANG: Record<string, Options> = {
  css: {
    parser: "css",
    plugins: [prettierPluginCss]
  },
  html: {
    parser: "html",
    plugins: [prettierPluginHtml]
  },
  js: {
    parser: "babel",
    plugins: [prettierPluginBabel, prettierPluginEstree]
  },
  ts: {
    parser: "babel",
    plugins: [prettierPluginBabel, prettierPluginEstree]
  },
  markdown: {
    parser: "markdown",
    plugins: [prettierPluginMarkdown]
  }
};

const LANG_CAN_BE_PRETTIER = Object.keys(PRETTIER_OPTIONS_BY_LANG);

export const canBePrettier = (lang: string): boolean => {
  return LANG_CAN_BE_PRETTIER.includes(lang);
};

export const getPrettierOptions = (lang: string): Options => {
  const options = PRETTIER_OPTIONS_BY_LANG[lang];

  if (!options) {
    // eslint-disable-next-line no-console
    console.error(
      `PrettierButtonCodeAction: Prettier does not support this language: ${lang}`
    );
  }

  return options;
};

export interface PrettierFormatError {
  cause: {
    code: string;
    name: string;
    reason: string;
    reasonCode: string;
  };
  codeFrame: string;
}
interface Props {
  codeDOMNode: HTMLElement;
  lang: string;
  setPrettierError: (error: PrettierFormatError | null) => void;
}

export const PrettierButtonCodeAction = ({
  codeDOMNode,
  lang,
  setPrettierError
}: Props): JSX.Element => {
  const t = useTranslations("core.editor.prettier");
  const [editor] = useLexicalComposerContext();
  const { setOpen } = useAlertDialog();

  return (
    <Button
      className="w-8 h-8 [&>svg]:pointer-events-none [&>svg]:fill-foreground [&>svg]:w-4 [&>svg]:h-4"
      variant="outline"
      size="icon"
      ariaLabel={t("format_code")}
      onClick={async (): Promise<void> => {
        try {
          let content = "";

          editor.update((): void => {
            const codeNode = $getNearestNodeFromDOMNode(codeDOMNode);
            if (!$isCodeNode(codeNode)) return;

            content = codeNode.getTextContent();
          });

          const parsed = await format(content, getPrettierOptions(lang));

          if (parsed === "") return;

          editor.update(async (): Promise<void> => {
            const codeNode = $getNearestNodeFromDOMNode(codeDOMNode);
            if (!$isCodeNode(codeNode)) return;

            const selection = codeNode.select(0);
            selection.insertText(parsed);
          });
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(JSON.stringify(error));

          const currentError = error as PrettierFormatError;

          if (currentError?.cause) {
            setPrettierError(currentError);
            setOpen(true);

            return;
          }
        }
      }}
    >
      <PrettierIcon />
    </Button>
  );
};
