"use client";

import { ReactNodeViewRenderer } from "@tiptap/react";

import { FileFromNextWithNode } from "./server";

export const renderReactNode = () =>
  ReactNodeViewRenderer(FileFromNextWithNode);
