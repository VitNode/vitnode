import { describe, expect, it } from "vitest";

import type { EditorEmojiSection } from "@/components/editor-provider";

import {
  customEmojiToPickerSections,
  customEmojiToTipTap,
  shortcodeOf,
} from "./custom-emoji";

const sections: EditorEmojiSection[] = [
  {
    emojis: [
      { name: "vitnode", src: "/logo.png", tags: ["logo"] },
      { name: "party", src: "https://cdn.example.com/party.gif" },
    ],
    label: "VitNode",
  },
];

describe("customEmojiToTipTap", () => {
  it("maps a section onto tiptap emoji items", () => {
    expect(customEmojiToTipTap(sections)).toEqual([
      {
        fallbackImage: "/logo.png",
        group: "VitNode",
        name: "vitnode",
        shortcodes: ["vitnode"],
        tags: ["logo"],
      },
      {
        fallbackImage: "https://cdn.example.com/party.gif",
        group: "VitNode",
        name: "party",
        shortcodes: ["party"],
        tags: [],
      },
    ]);
  });

  it("returns nothing when the app configured no custom emoji", () => {
    expect(customEmojiToTipTap()).toEqual([]);
  });
});

describe("customEmojiToPickerSections", () => {
  it("maps a section onto a picker section", () => {
    expect(customEmojiToPickerSections(sections)).toEqual([
      {
        emojis: [
          { id: "vitnode", imageUrl: "/logo.png", name: "vitnode" },
          {
            id: "party",
            imageUrl: "https://cdn.example.com/party.gif",
            name: "party",
          },
        ],
        id: "custom-0",
        name: "VitNode",
      },
    ]);
  });
});

describe("shortcodeOf", () => {
  it("reads the shortcode the picker sends for a custom emoji", () => {
    expect(shortcodeOf(":vitnode:")).toBe("vitnode");
  });

  it("ignores a unicode emoji", () => {
    expect(shortcodeOf("🎉")).toBeNull();
  });

  it("ignores text that only looks like a shortcode", () => {
    expect(shortcodeOf(":not a code:")).toBeNull();
    expect(shortcodeOf("::")).toBeNull();
  });
});
