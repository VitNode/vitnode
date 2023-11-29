export const convertHlsToRgb = (h: number, l: number, s: number) => {
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);

    return Math.round(255 * color);
  };

  return [f(0), f(8), f(4)];
};
