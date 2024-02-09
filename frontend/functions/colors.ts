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

    return { h: h * 360, s: s * 100, l: l * 100 };
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
  }
};
