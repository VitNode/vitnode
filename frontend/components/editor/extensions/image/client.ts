"use client";

import { ReactNodeViewRenderer } from "@tiptap/react";

import { ImageFromNextWithNode } from "./server";

export const renderReactNode = () =>
  ReactNodeViewRenderer(ImageFromNextWithNode);
