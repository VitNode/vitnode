"use client";

import { ReactNodeViewRenderer } from "@tiptap/react";

import { CodeBlockComponent } from "./code-block-component";

export const renderReactNode = () => ReactNodeViewRenderer(CodeBlockComponent);
