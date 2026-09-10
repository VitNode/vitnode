import { describe, expect, it } from "vitest";

import {
  clampOffset,
  clampZoom,
  coverScale,
  displayedSize,
  frameFor,
  MAX_ZOOM,
  MIN_ZOOM,
  rescaleOffset,
  sourceRect,
} from "./crop-math";

const square = { height: 200, width: 200 };
const wide = { height: 100, width: 400 };
const tall = { height: 400, width: 100 };

describe("coverScale", () => {
  it("scales a wide image up until it covers the frame's height", () => {
    expect(coverScale(wide, square)).toBe(2);
  });

  it("scales a tall image up until it covers the frame's width", () => {
    expect(coverScale(tall, square)).toBe(2);
  });

  it("is 1 for an image already the frame's size", () => {
    expect(coverScale(square, square)).toBe(1);
  });
});

describe("clampZoom", () => {
  it("keeps the zoom inside the allowed range", () => {
    expect(clampZoom(0)).toBe(MIN_ZOOM);
    expect(clampZoom(99)).toBe(MAX_ZOOM);
    expect(clampZoom(2.5)).toBe(2.5);
  });
});

describe("displayedSize", () => {
  it("grows with the zoom", () => {
    expect(displayedSize(square, square, 2)).toEqual({
      height: 400,
      width: 400,
    });
  });
});

describe("clampOffset", () => {
  it("allows no panning when the image exactly covers the frame", () => {
    expect(clampOffset({ x: 50, y: -50 }, square, square, 1)).toEqual({
      x: 0,
      y: 0,
    });
  });

  it("allows panning only along the axis with slack", () => {
    expect(clampOffset({ x: 999, y: 999 }, wide, square, 1)).toEqual({
      x: 300,
      y: 0,
    });
  });

  it("lets a zoomed image pan up to half its overflow", () => {
    expect(clampOffset({ x: -999, y: 30 }, square, square, 2)).toEqual({
      x: -100,
      y: 30,
    });
  });
});

describe("frameFor", () => {
  it("fills the available width when the aspect fits", () => {
    expect(frameFor(3, { height: 300, width: 600 })).toEqual({
      height: 200,
      width: 600,
    });
  });

  it("falls back to the available height when the width would overflow", () => {
    expect(frameFor(1, { height: 200, width: 600 })).toEqual({
      height: 200,
      width: 200,
    });
  });
});

describe("sourceRect", () => {
  it("covers the whole image at zoom 1 with no offset", () => {
    expect(sourceRect(square, square, 1, { x: 0, y: 0 })).toEqual({
      height: 200,
      width: 200,
      x: 0,
      y: 0,
    });
  });

  it("takes the centre quarter at zoom 2", () => {
    expect(sourceRect(square, square, 2, { x: 0, y: 0 })).toEqual({
      height: 100,
      width: 100,
      x: 50,
      y: 50,
    });
  });

  it("moves the window opposite to the pan", () => {
    const rect = sourceRect(wide, square, 1, { x: 300, y: 0 });

    expect(rect).toEqual({ height: 100, width: 100, x: 0, y: 0 });
  });

  it("never reads outside the image, even for a wild offset", () => {
    const rect = sourceRect(wide, square, 1, { x: -9999, y: 9999 });

    expect(rect.x + rect.width).toBeLessThanOrEqual(wide.width);
    expect(rect.y + rect.height).toBeLessThanOrEqual(wide.height);
    expect(rect.x).toBeGreaterThanOrEqual(0);
    expect(rect.y).toBeGreaterThanOrEqual(0);
  });
});

describe("rescaleOffset", () => {
  it("keeps the pan proportional when the frame is resized", () => {
    expect(
      rescaleOffset(
        { x: 30, y: 10 },
        { height: 100, width: 300 },
        {
          height: 200,
          width: 600,
        },
      ),
    ).toEqual({ x: 60, y: 20 });
  });

  it("leaves the offset alone for a frame with no size yet", () => {
    expect(
      rescaleOffset({ x: 30, y: 10 }, { height: 0, width: 0 }, square),
    ).toEqual({ x: 30, y: 10 });
  });
});
