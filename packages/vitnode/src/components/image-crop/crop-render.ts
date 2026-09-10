import type { Size } from "./crop-math";

import { sourceRect } from "./crop-math";

const OUTPUT_QUALITY = 0.9;

export interface ImageCropOutput {
  height: number;
  width: number;
}

export interface LoadedSource {
  image: HTMLImageElement;
  size: Size;
  url: string;
}

export const CROP_UNREADABLE = "unreadable";

export const loadSource = async (file: File): Promise<LoadedSource> =>
  new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
      resolve({
        image,
        size: { height: image.naturalHeight, width: image.naturalWidth },
        url,
      });
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error(CROP_UNREADABLE));
    };
    image.src = url;
  });

export const encoderFor = (): { extension: string; type: string } => {
  const probe = document.createElement("canvas");
  probe.width = 1;
  probe.height = 1;
  const supportsWebp = probe
    .toDataURL("image/webp")
    .startsWith("data:image/webp");

  return supportsWebp
    ? { extension: "webp", type: "image/webp" }
    : { extension: "jpg", type: "image/jpeg" };
};

export const renderCrop = async ({
  frame,
  offset,
  output,
  source,
  zoom,
}: {
  frame: Size;
  offset: { x: number; y: number };
  output: ImageCropOutput;
  source: LoadedSource;
  zoom: number;
}): Promise<Blob> => {
  const rect = sourceRect(source.size, frame, zoom, offset);
  const canvas = document.createElement("canvas");
  canvas.width = output.width;
  canvas.height = output.height;

  const context = canvas.getContext("2d");
  if (!context) throw new Error(CROP_UNREADABLE);

  context.imageSmoothingQuality = "high";
  context.drawImage(
    source.image,
    rect.x,
    rect.y,
    rect.width,
    rect.height,
    0,
    0,
    output.width,
    output.height,
  );

  const { type } = encoderFor();

  return await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      blob => {
        if (blob) resolve(blob);
        else reject(new Error(CROP_UNREADABLE));
      },
      type,
      OUTPUT_QUALITY,
    );
  });
};
