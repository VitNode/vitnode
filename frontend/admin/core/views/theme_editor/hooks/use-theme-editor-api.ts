import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import type { HslColor } from "react-colorful";

import { useRouter } from "@/i18n";
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
  primary: zObjectHslWithTheme,
  ["primary-foreground"]: zObjectHslWithTheme,
  secondary: zObjectHslWithTheme,
  ["secondary-foreground"]: zObjectHslWithTheme,
  background: zObjectHslWithTheme,
  destructive: zObjectHslWithTheme,
  ["destructive-foreground"]: zObjectHslWithTheme,
  base: zObjectHslWithTheme,
  ["base-foreground"]: zObjectHslWithTheme,
  accent: zObjectHslWithTheme,
  ["accent-foreground"]: zObjectHslWithTheme,
  muted: zObjectHslWithTheme,
  ["muted-foreground"]: zObjectHslWithTheme,
  card: zObjectHslWithTheme,
  border: zObjectHslWithTheme
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
      colors: {
        ...core_theme_editor__show.colors,
        ["primary-foreground"]:
          core_theme_editor__show.colors.primary_foreground,
        ["secondary-foreground"]:
          core_theme_editor__show.colors.secondary_foreground,
        ["destructive-foreground"]:
          core_theme_editor__show.colors.destructive_foreground,
        ["base-foreground"]: core_theme_editor__show.colors.base_foreground,
        ["accent-foreground"]: core_theme_editor__show.colors.accent_foreground,
        ["muted-foreground"]: core_theme_editor__show.colors.muted_foreground
      }
    }
  });

  // Set values to iframe when theme changes
  useEffect(() => {
    const iframe =
      iframeRef.current?.contentWindow?.document.querySelector("html");
    if (!iframe) return;

    const colors: (keyof typeof formSchemaColorsThemeEditor.shape)[] =
      Object.keys(
        formSchemaColorsThemeEditor.shape
      ) as (keyof typeof formSchemaColorsThemeEditor.shape)[];

    colors.forEach(color => {
      const hslColor = form.getValues(`colors.${color}`)[activeTheme];
      iframe.style.setProperty(
        `--${color}`,
        `${hslColor.h} ${hslColor.s}% ${hslColor.l}%`
      );
    });
  }, [activeTheme]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // eslint-disable-next-line no-console
    console.log(values);
    //  push("/");
  };

  const changeColor = ({
    hslColor,
    name
  }: {
    hslColor: HslColor;
    name: keyof typeof formSchemaColorsThemeEditor.shape;
  }) => {
    const iframe =
      iframeRef.current?.contentWindow?.document.querySelector("html");
    if (!iframe) return;

    iframe.style.setProperty(
      `--${name}`,
      `${hslColor.h} ${hslColor.s}% ${hslColor.l}%`
    );

    if (activeTheme === "light") {
      form.setValue(`colors.${name}`, {
        light: hslColor,
        dark: form.getValues(`colors.${name}`).dark
      });
    } else {
      form.setValue(`colors.${name}`, {
        light: form.getValues(`colors.${name}`).light,
        dark: hslColor
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
