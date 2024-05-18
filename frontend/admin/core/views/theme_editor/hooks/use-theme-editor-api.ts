import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRef } from "react";
import { useTheme } from "next-themes";

import { useRouter } from "@/i18n";
import { getHSLFromString } from "@/functions/colors";
import type { Core_Theme_Editor__ShowQuery } from "@/graphql/hooks";

const zObjectHsl = z.object({
  h: z.number(),
  s: z.number(),
  l: z.number()
});
const zObjectHslWithTheme = z.object({
  light: zObjectHsl,
  dark: zObjectHsl
});
export const formSchemaColorsThemeEditor = z.object({
  primary: zObjectHslWithTheme
});

export const useThemeEditorApi = ({
  core_theme_editor__show
}: Core_Theme_Editor__ShowQuery) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { push } = useRouter();
  const formSchema = z.object({
    colors: formSchemaColorsThemeEditor
  });
  const { resolvedTheme, theme } = useTheme();
  const activeTheme: "light" | "dark" =
    (resolvedTheme ?? theme) === "dark" ? "dark" : "light";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      colors: core_theme_editor__show
    }
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // eslint-disable-next-line no-console
    console.log(values);
    //  push("/");
  };

  const changeColor = ({
    color,
    name
  }: {
    color: string;
    name: keyof typeof formSchemaColorsThemeEditor.shape;
  }) => {
    const iframe =
      iframeRef.current?.contentWindow?.document.querySelector("html");
    const hslFromColor = getHSLFromString(color);

    if (!iframe || !hslFromColor) {
      return;
    }

    iframe.style.setProperty(
      `--${name}`,
      `${hslFromColor.h} ${hslFromColor.s}% ${hslFromColor.l}%`
    );

    if (activeTheme === "light") {
      form.setValue(`colors.${name}`, {
        light: hslFromColor,
        dark: form.getValues(`colors.${name}`).dark
      });
    } else {
      form.setValue(`colors.${name}`, {
        light: form.getValues(`colors.${name}`).light,
        dark: hslFromColor
      });
    }
  };

  return {
    form,
    onSubmit,
    iframeRef,
    changeColor,
    activeTheme
  };
};
