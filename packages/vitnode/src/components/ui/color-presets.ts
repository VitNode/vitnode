import { colorLuminance } from "@/lib/colors";

export const COLOR_PRESET_ROWS = [
  [
    { id: "default", value: "" },
    { id: "light_red", value: "oklch(0.678 0.19 25)" },
    { id: "light_orange", value: "oklch(0.665 0.142 55)" },
    { id: "light_yellow", value: "oklch(0.654 0.116 92)" },
    { id: "light_green", value: "oklch(0.638 0.15 148)" },
    { id: "light_teal", value: "oklch(0.645 0.098 205)" },
    { id: "light_blue", value: "oklch(0.659 0.182 258)" },
    { id: "light_purple", value: "oklch(0.676 0.2 305)" },
  ],
  [
    { id: "gray", value: "oklch(0.574 0.012 264)" },
    { id: "red", value: "oklch(0.597 0.19 25)" },
    { id: "orange", value: "oklch(0.586 0.142 55)" },
    { id: "yellow", value: "oklch(0.575 0.116 92)" },
    { id: "green", value: "oklch(0.558 0.15 148)" },
    { id: "teal", value: "oklch(0.564 0.096 205)" },
    { id: "blue", value: "oklch(0.58 0.19 258)" },
    { id: "purple", value: "oklch(0.598 0.2 305)" },
  ],
  [
    { id: "dark_gray", value: "oklch(0.501 0.012 264)" },
    { id: "dark_red", value: "oklch(0.523 0.19 25)" },
    { id: "dark_orange", value: "oklch(0.511 0.126 55)" },
    { id: "dark_yellow", value: "oklch(0.5 0.102 92)" },
    { id: "dark_green", value: "oklch(0.486 0.14 148)" },
    { id: "dark_teal", value: "oklch(0.492 0.084 205)" },
    { id: "dark_blue", value: "oklch(0.507 0.188 258)" },
    { id: "dark_purple", value: "oklch(0.525 0.2 305)" },
  ],
] as const satisfies readonly (readonly { id: string; value: string }[])[];

export type ColorPresetId = (typeof COLOR_PRESET_ROWS)[number][number]["id"];

export interface ColorPreset {
  id: ColorPresetId;
  value: string;
}

export const COLOR_PRESETS: readonly ColorPreset[] = COLOR_PRESET_ROWS.flat();

export const DEFAULT_COLOR_PRESET = COLOR_PRESETS[0];

const normalizeColor = (value: string) =>
  value.trim().toLowerCase().replace(/\s+/g, " ");

export const findColorPreset = (value: string): ColorPreset | undefined => {
  const normalized = normalizeColor(value);

  return COLOR_PRESETS.find(preset => preset.value === normalized);
};

export const getColorPresetId = (value: string): ColorPresetId | null =>
  findColorPreset(value)?.id ?? null;

export const getColorPresetValue = (id: string): string =>
  COLOR_PRESETS.find(preset => preset.id === id)?.value ??
  DEFAULT_COLOR_PRESET.value;

const DARK_CHECK_MARK_LUMINANCE = 0.24;

export const prefersDarkCheckMark = (value: string): boolean =>
  (colorLuminance(value) ?? 0) > DARK_CHECK_MARK_LUMINANCE;
