export interface Size {
  height: number;
  width: number;
}

export interface Offset {
  x: number;
  y: number;
}

export interface SourceRect {
  height: number;
  width: number;
  x: number;
  y: number;
}

export const MIN_ZOOM = 1;
export const MAX_ZOOM = 4;

export const clampZoom = (zoom: number): number =>
  Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, zoom));

export const coverScale = (image: Size, frame: Size): number =>
  Math.max(frame.width / image.width, frame.height / image.height);

export const displayedSize = (image: Size, frame: Size, zoom: number): Size => {
  const scale = coverScale(image, frame) * clampZoom(zoom);

  return { height: image.height * scale, width: image.width * scale };
};

const clampAxis = (value: number, slack: number): number => {
  const max = Math.max(0, slack);

  return Math.min(max, Math.max(-max, value)) || 0;
};

export const clampOffset = (
  offset: Offset,
  image: Size,
  frame: Size,
  zoom: number,
): Offset => {
  const shown = displayedSize(image, frame, zoom);

  return {
    x: clampAxis(offset.x, (shown.width - frame.width) / 2),
    y: clampAxis(offset.y, (shown.height - frame.height) / 2),
  };
};

export const frameFor = (aspect: number, available: Size): Size => {
  const widthLimited = {
    height: available.width / aspect,
    width: available.width,
  };

  if (widthLimited.height <= available.height) return widthLimited;

  return { height: available.height, width: available.height * aspect };
};

export const sourceRect = (
  image: Size,
  frame: Size,
  zoom: number,
  offset: Offset,
): SourceRect => {
  const scale = coverScale(image, frame) * clampZoom(zoom);
  const shown = displayedSize(image, frame, zoom);
  const clamped = clampOffset(offset, image, frame, zoom);

  return {
    height: frame.height / scale,
    width: frame.width / scale,
    x: (shown.width / 2 - frame.width / 2 - clamped.x) / scale,
    y: (shown.height / 2 - frame.height / 2 - clamped.y) / scale,
  };
};

export const rescaleOffset = (offset: Offset, from: Size, to: Size): Offset => {
  if (from.width === 0 || from.height === 0) return offset;

  return {
    x: (offset.x * to.width) / from.width,
    y: (offset.y * to.height) / from.height,
  };
};
