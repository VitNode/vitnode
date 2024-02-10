export const colorConverter = {
  hslToHex: (h: number, s: number, l: number): string => {
    l /= 100;
    const a = (s * Math.min(l, 1 - l)) / 100;
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);

      return Math.round(255 * color)
        .toString(16)
        .padStart(2, "0");
    };

    return `#${f(0)}${f(8)}${f(4)}`;
  },

  hexToHSL: (hex: string): { h: number; l: number; s: number } | undefined => {
    let r = 0,
      g = 0,
      b = 0;

    // 3 digits
    if (hex.length == 4) {
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    }
    // 6 digits
    else if (hex.length == 7) {
      r = parseInt(hex[1] + hex[2], 16);
      g = parseInt(hex[3] + hex[4], 16);
      b = parseInt(hex[5] + hex[6], 16);
    } else {
      return undefined;
    }

    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b),
      min = Math.min(r, g, b),
      l = (max + min) / 2;
    let h = 0,
      s = 0;

    if (max == min) {
      h = s = 0; // achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  },

  hexToRGB(hex: string) {
    const r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);

    return { r, g, b };
  },

  RGBToHSV(r: number, g: number, b: number) {
    const v = Math.max(r, g, b),
      c = v - Math.min(r, g, b);
    const h =
      c &&
      (v === r ? (g - b) / c : v === g ? 2 + (b - r) / c : 4 + (r - g) / c);

    return {
      h: 60 * (h < 0 ? h + 6 : h),
      s: v && (c / v) * 100,
      v: (v / 255) * 100
    };
  },

  RGBToHSL(r: number, g: number, b: number) {
    // Make r, g, and b fractions of 1
    r /= 255;
    g /= 255;
    b /= 255;

    // Find greatest and smallest channel values
    const cmin = Math.min(r, g, b),
      cmax = Math.max(r, g, b),
      delta = cmax - cmin;

    let h = 0,
      s = 0,
      l = 0;

    // Calculate hue
    if (delta == 0) h = 0;
    else if (cmax == r) h = ((g - b) / delta) % 6;
    else if (cmax == g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    // Make negative hues positive behind 360°
    if (h < 0) h += 360;

    // Calculate lightness
    l = (cmax + cmin) / 2;

    // Calculate saturation
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    // Multiply l and s by 100
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return {
      h,
      s,
      l
    };
  }
};

type CheckColorReturn = "hex" | "hsl" | "rgb";

export const checkColorType = (strColor: string): CheckColorReturn | null => {
  const hexRegex = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  if (hexRegex.test(strColor)) {
    return "hex";
  }

  const hslRegex = /^hsl\(\s*\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*\)$/;

  if (hslRegex.test(strColor)) {
    return "hsl";
  }

  const rgbWithCommaRegex =
    /^rgb\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)$/;
  const rgbWithoutCommaRegex = /^rgb\(\s*\d{1,3}\s+\d{1,3}\s+\d{1,3}\s*\)$/;

  if (rgbWithoutCommaRegex.test(strColor) || rgbWithCommaRegex.test(strColor)) {
    return "rgb";
  }

  return null;
};
