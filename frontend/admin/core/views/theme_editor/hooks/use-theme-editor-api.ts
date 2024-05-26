import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { HslColor } from "react-colorful";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

import { Core_Theme_Editor__ShowQuery } from "@/graphql/hooks";
import { mutationApi } from "./mutation-api";
import { CONFIG } from "@/config";
import { useRouter } from "@/utils/i18n";

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
  cover: zObjectHslWithTheme,
  ["cover-foreground"]: zObjectHslWithTheme,
  accent: zObjectHslWithTheme,
  ["accent-foreground"]: zObjectHslWithTheme,
  muted: zObjectHslWithTheme,
  ["muted-foreground"]: zObjectHslWithTheme,
  card: zObjectHslWithTheme,
  border: zObjectHslWithTheme
});

export const keysFromCSSThemeEditor = [
  "primary",
  "primary-foreground",
  "secondary",
  "secondary-foreground",
  "background",
  "destructive",
  "destructive-foreground",
  "cover",
  "cover-foreground",
  "muted",
  "muted-foreground",
  "accent",
  "accent-foreground",
  "card",
  "border"
] as const;

export const useThemeEditorApi = ({
  core_theme_editor__show
}: Core_Theme_Editor__ShowQuery) => {
  const [openSubmitDialog, setOpenSubmitDialog] = useState(false);
  const t = useTranslations("core.theme_editor.submit");
  const tCore = useTranslations("core");
  const { push } = useRouter();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const formSchema = z.object({
    colors: formSchemaColorsThemeEditor
  });
  const { resolvedTheme, theme } = useTheme();
  const activeTheme: "dark" | "light" =
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
        ["cover-foreground"]: core_theme_editor__show.colors.cover_foreground,
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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const mutation = await mutationApi({
      colors: {
        primary: values.colors.primary,
        secondary: values.colors.secondary,
        background: values.colors.background,
        destructive: values.colors.destructive,
        cover: values.colors.cover,
        accent: values.colors.accent,
        muted: values.colors.muted,
        card: values.colors.card,
        border: values.colors.border,
        primary_foreground: values.colors["primary-foreground"],
        secondary_foreground: values.colors["secondary-foreground"],
        destructive_foreground: values.colors["destructive-foreground"],
        cover_foreground: values.colors["cover-foreground"],
        accent_foreground: values.colors["accent-foreground"],
        muted_foreground: values.colors["muted-foreground"]
      }
    });

    if (mutation.error) {
      toast.error(tCore("errors.title"), {
        description: tCore("errors.internal_server_error")
      });

      return;
    }

    setOpenSubmitDialog(false);
    push("/");

    toast.success(t("success.title"), {
      description: !CONFIG.node_development && t("success.desc")
    });
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
    activeTheme,
    openSubmitDialog,
    setOpenSubmitDialog
  };
};
