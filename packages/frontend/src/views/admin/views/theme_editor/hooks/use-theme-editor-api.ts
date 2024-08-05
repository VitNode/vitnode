import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import React from 'react';
import { useTheme } from 'next-themes';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

import { mutationApi } from './mutation-api';
import { useRouter } from '@/navigation';
import { CONFIG } from '@/helpers/config-with-env';
import { zodFile } from '@/helpers/zod';
import { Core_Theme_Editor__ShowQuery } from '@/graphql/queries/admin/theme_editor/core_theme_editor__show.generated';
import { HslColor } from '@/graphql/types';

const zObjectHsl = z.object({
  h: z.number(),
  s: z.number(),
  l: z.number(),
});
const zObjectHslWithTheme = z.object({
  light: zObjectHsl,
  dark: zObjectHsl,
});
export const formSchemaColorsThemeEditor = z.object({
  primary: zObjectHslWithTheme,
  ['primary-foreground']: zObjectHslWithTheme,
  secondary: zObjectHslWithTheme,
  ['secondary-foreground']: zObjectHslWithTheme,
  background: zObjectHslWithTheme,
  destructive: zObjectHslWithTheme,
  ['destructive-foreground']: zObjectHslWithTheme,
  cover: zObjectHslWithTheme,
  ['cover-foreground']: zObjectHslWithTheme,
  accent: zObjectHslWithTheme,
  ['accent-foreground']: zObjectHslWithTheme,
  muted: zObjectHslWithTheme,
  ['muted-foreground']: zObjectHslWithTheme,
  card: zObjectHslWithTheme,
  border: zObjectHslWithTheme,
});

export const keysFromCSSThemeEditor = [
  'primary',
  'primary-foreground',
  'secondary',
  'secondary-foreground',
  'background',
  'destructive',
  'destructive-foreground',
  'cover',
  'cover-foreground',
  'muted',
  'muted-foreground',
  'accent',
  'accent-foreground',
  'card',
  'border',
] as const;

export const useThemeEditorApi = ({
  core_theme_editor__show,
}: Core_Theme_Editor__ShowQuery) => {
  const [openSubmitDialog, setOpenSubmitDialog] = React.useState(false);
  const t = useTranslations('admin.theme_editor.submit');
  const tCore = useTranslations('core');
  const { push } = useRouter();
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const formSchema = z.object({
    colors: formSchemaColorsThemeEditor.optional(),
    logos: z.object({
      light: zodFile.nullable(),
      dark: zodFile.nullable(),
      width: z.number(),
      mobile_light: zodFile.nullable(),
      mobile_dark: zodFile.nullable(),
      mobile_width: z.number(),
      text: z.string().min(1).max(100),
    }),
  });
  const { resolvedTheme, theme } = useTheme();
  const activeTheme: 'dark' | 'light' =
    (resolvedTheme ?? theme) === 'dark' ? 'dark' : 'light';

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      colors: {
        ...core_theme_editor__show.colors,
        ['primary-foreground']:
          core_theme_editor__show.colors?.primary_foreground,
        ['secondary-foreground']:
          core_theme_editor__show.colors?.secondary_foreground,
        ['destructive-foreground']:
          core_theme_editor__show.colors?.destructive_foreground,
        ['cover-foreground']: core_theme_editor__show.colors?.cover_foreground,
        ['accent-foreground']:
          core_theme_editor__show.colors?.accent_foreground,
        ['muted-foreground']: core_theme_editor__show.colors?.muted_foreground,
      },
      logos: {
        light: core_theme_editor__show.logos.light,
        dark: core_theme_editor__show.logos.dark,
        width: core_theme_editor__show.logos.width,
        mobile_light: core_theme_editor__show.logos.mobile_light,
        mobile_dark: core_theme_editor__show.logos.mobile_dark,
        mobile_width: core_theme_editor__show.logos.mobile_width,
        text: core_theme_editor__show.logos.text,
      },
    },
  });

  // Set values to iframe when theme changes
  React.useEffect(() => {
    const iframe =
      iframeRef.current?.contentWindow?.document.querySelector('html');
    if (!iframe) return;

    const colors: (keyof typeof formSchemaColorsThemeEditor.shape)[] =
      Object.keys(
        formSchemaColorsThemeEditor.shape,
      ) as (keyof typeof formSchemaColorsThemeEditor.shape)[];

    colors.forEach(color => {
      const hslColor = form.getValues(`colors.${color}`)[activeTheme];
      iframe.style.setProperty(
        `--${color}`,
        `${hslColor.h} ${hslColor.s}% ${hslColor.l}%`,
      );
    });
  }, [activeTheme]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    if (values.colors) {
      formData.append(
        'colors',
        JSON.stringify({
          primary: values.colors.primary,
          secondary: values.colors.secondary,
          background: values.colors.background,
          destructive: values.colors.destructive,
          cover: values.colors.cover,
          accent: values.colors.accent,
          muted: values.colors.muted,
          card: values.colors.card,
          border: values.colors.border,
          primary_foreground: values.colors['primary-foreground'],
          secondary_foreground: values.colors['secondary-foreground'],
          destructive_foreground: values.colors['destructive-foreground'],
          cover_foreground: values.colors['cover-foreground'],
          accent_foreground: values.colors['accent-foreground'],
          muted_foreground: values.colors['muted-foreground'],
        }),
      );
    }
    formData.append('logos.text', values.logos.text);
    formData.append('logos.width', values.logos.width.toString());
    formData.append('logos.mobile_width', values.logos.mobile_width.toString());
    ['dark', 'light', 'mobile_dark', 'mobile_light'].forEach(el => {
      if (!values.logos[el]) return;

      if (values.logos[el] instanceof File) {
        formData.append(`logos.${el}.file`, values.logos[el]);
      } else {
        formData.append(`logos.${el}.keep`, 'true');
      }
    });

    const mutation = await mutationApi(formData);

    if (mutation?.error) {
      toast.error(tCore('errors.title'), {
        description: tCore('errors.internal_server_error'),
      });

      return;
    }

    toast.success(t('success.title'), {
      description: !CONFIG.node_development && t('success.desc'),
    });
    setOpenSubmitDialog(false);
    push('/admin/core/dashboard');
  };

  const changeColor = ({
    hslColor,
    name,
  }: {
    hslColor: HslColor;
    name: keyof typeof formSchemaColorsThemeEditor.shape;
  }) => {
    const iframe =
      iframeRef.current?.contentWindow?.document.querySelector('html');
    if (!iframe) return;

    iframe.style.setProperty(
      `--${name}`,
      `${hslColor.h} ${hslColor.s}% ${hslColor.l}%`,
    );

    if (activeTheme === 'light') {
      form.setValue(`colors.${name}`, {
        light: hslColor,
        dark: form.getValues(`colors.${name}`).dark,
      });
    } else {
      form.setValue(`colors.${name}`, {
        light: form.getValues(`colors.${name}`).light,
        dark: hslColor,
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
    setOpenSubmitDialog,
  };
};
