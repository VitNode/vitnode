import { describe, expect, it } from "vitest";

import { colorContrastRatio, colorToHslString } from "@/lib/colors";

import {
  COLOR_PRESET_ROWS,
  COLOR_PRESETS,
  DEFAULT_COLOR_PRESET,
  findColorPreset,
  getColorPresetId,
  getColorPresetValue,
  prefersDarkCheckMark,
} from "./color-presets";

const LIGHT_THEME_BACKGROUND = "oklch(1 0 0)";
const DARK_THEME_BACKGROUND = "oklch(0.163 0.009 264)";
const PICKER_FORMAT = /^hsl\(\d+, \d+%, \d+%\)$/;
const MINIMUM_CONTRAST = 3;

const COLORED_PRESETS = COLOR_PRESETS.filter(preset => preset.value);

describe("color presets", () => {
  it("lays out three rows of eight swatches", () => {
    expect(COLOR_PRESET_ROWS).toHaveLength(3);
    for (const row of COLOR_PRESET_ROWS) expect(row).toHaveLength(8);
  });

  it("starts with a default swatch that carries no color of its own", () => {
    expect(DEFAULT_COLOR_PRESET.id).toBe("default");
    expect(DEFAULT_COLOR_PRESET.value).toBe("");
    expect(COLORED_PRESETS).toHaveLength(COLOR_PRESETS.length - 1);
  });

  it("uses unique lowercase hex values and ids", () => {
    const values = COLORED_PRESETS.map(preset => preset.value);
    const ids = COLOR_PRESETS.map(preset => preset.id);

    expect(new Set(values).size).toBe(values.length);
    expect(new Set(ids).size).toBe(ids.length);
    for (const value of values) {
      expect(value).toMatch(PICKER_FORMAT);
    }
  });

  it("stays readable on both the light and the dark background", () => {
    for (const preset of COLORED_PRESETS) {
      const onLight = colorContrastRatio(preset.value, LIGHT_THEME_BACKGROUND);
      const onDark = colorContrastRatio(preset.value, DARK_THEME_BACKGROUND);

      expect(onLight, preset.id).toBeGreaterThanOrEqual(MINIMUM_CONTRAST);
      expect(onDark, preset.id).toBeGreaterThanOrEqual(MINIMUM_CONTRAST);
    }
  });

  it("keeps the check mark readable on every swatch", () => {
    for (const preset of COLORED_PRESETS) {
      const checkMark = prefersDarkCheckMark(preset.value)
        ? "hsl(224, 71%, 4%)"
        : "hsl(0, 0%, 100%)";

      expect(
        colorContrastRatio(preset.value, checkMark),
        preset.id,
      ).toBeGreaterThanOrEqual(MINIMUM_CONTRAST);
    }
  });

  it("writes colors in the format the free-form picker emits", () => {
    for (const preset of COLORED_PRESETS) {
      expect(colorToHslString(preset.value), preset.id).toBe(preset.value);
    }
  });

  it("matches a preset regardless of casing and spacing", () => {
    expect(findColorPreset(" HSL(215,  81%, 52%) ")?.id).toBe("blue");
    expect(findColorPreset("hsl(215, 81%, 52%)")?.id).toBe("blue");
    expect(findColorPreset("")?.id).toBe("default");
    expect(findColorPreset("hsl(240, 80%, 60%)")).toBeUndefined();
  });

  it("maps a color to the swatch that owns it", () => {
    expect(getColorPresetId("hsl(0, 67%, 55%)")).toBe("red");
    expect(getColorPresetId("")).toBe("default");
    expect(getColorPresetId("hsl(240, 80%, 60%)")).toBeNull();
  });

  it("maps a swatch back to the color it stores", () => {
    expect(getColorPresetValue("dark_teal")).toBe("hsl(185, 100%, 24%)");
    expect(getColorPresetValue("default")).toBe("");
    expect(getColorPresetValue("not_a_preset")).toBe("");
  });

  it("asks for a dark check mark only on the lightest row", () => {
    for (const preset of COLOR_PRESET_ROWS[0].slice(1)) {
      expect(prefersDarkCheckMark(preset.value), preset.id).toBe(true);
    }

    for (const row of COLOR_PRESET_ROWS.slice(1)) {
      for (const preset of row) {
        expect(prefersDarkCheckMark(preset.value), preset.id).toBe(false);
      }
    }
  });
});
