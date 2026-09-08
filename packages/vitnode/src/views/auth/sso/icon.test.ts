import { describe, expect, it } from "vitest";

import { ssoIconSource } from "./icon";

describe("reading an SSO provider icon", () => {
  it("accepts inline SVG markup", () => {
    const markup = '<svg viewBox="0 0 24 24"><path d="M0 0h24v24H0z" /></svg>';

    expect(ssoIconSource(markup)).toEqual({ kind: "svg", markup });
    expect(ssoIconSource(`\n  ${markup}  `)).toEqual({ kind: "svg", markup });
  });

  it("accepts an image the browser can load", () => {
    expect(ssoIconSource("https://cdn.example.com/github.svg")).toEqual({
      kind: "image",
      src: "https://cdn.example.com/github.svg",
    });
    expect(ssoIconSource("/icons/slack.png")).toEqual({
      kind: "image",
      src: "/icons/slack.png",
    });
    expect(ssoIconSource("data:image/png;base64,iVBORw0KGgo=")).toEqual({
      kind: "image",
      src: "data:image/png;base64,iVBORw0KGgo=",
    });
  });

  it("accepts the contents of an .svg file", () => {
    const markup = '<svg viewBox="0 0 24 24"><path d="M0 0h24v24H0z" /></svg>';
    const file = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "svg11.dtd">',
      "<!-- Generator: some drawing app -->",
      markup,
      "",
    ].join("\n");

    expect(ssoIconSource(file)).toEqual({ kind: "svg", markup });
  });

  it("accepts a bundler's inlined data URI, encoded either way", () => {
    const encoded =
      "data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%201%201%22%3E%3C%2Fsvg%3E";
    const utf8 =
      "data:image/svg+xml;charset=utf-8,<svg viewBox='0 0 1 1'></svg>";

    expect(ssoIconSource(encoded)).toEqual({ kind: "image", src: encoded });
    expect(ssoIconSource(utf8)).toEqual({ kind: "image", src: utf8 });
  });

  it("answers with nothing when there is no icon to render", () => {
    expect(ssoIconSource(undefined)).toBeUndefined();
    expect(ssoIconSource(null)).toBeUndefined();
    expect(ssoIconSource("")).toBeUndefined();
    expect(ssoIconSource("   ")).toBeUndefined();
    expect(ssoIconSource(42)).toBeUndefined();
  });

  it("refuses markup that is not a lone SVG element", () => {
    expect(ssoIconSource("<div>Google</div>")).toBeUndefined();
    expect(
      ssoIconSource("<svg><path /></svg><div>after</div>"),
    ).toBeUndefined();
    expect(ssoIconSource("<svg><path />")).toBeUndefined();
  });

  it("refuses an SVG that carries anything executable", () => {
    expect(
      ssoIconSource('<svg><script>alert("x")</script></svg>'),
    ).toBeUndefined();
    expect(ssoIconSource('<svg onload="alert(1)"></svg>')).toBeUndefined();
    expect(
      ssoIconSource('<svg><a href="javascript:alert(1)"><path /></a></svg>'),
    ).toBeUndefined();
    expect(
      ssoIconSource("<svg><foreignObject><body /></foreignObject></svg>"),
    ).toBeUndefined();
  });

  it("refuses an .svg file whose preamble hides something executable", () => {
    expect(
      ssoIconSource(
        '<?xml version="1.0"?><svg><script>alert(1)</script></svg>',
      ),
    ).toBeUndefined();
    expect(
      ssoIconSource('<!DOCTYPE svg [<!ENTITY a "b">]><svg></svg>'),
    ).toBeUndefined();
    expect(ssoIconSource('<?xml version="1.0"?>')).toBeUndefined();
  });

  it("refuses an .svg file carrying a page-wide <style> block", () => {
    expect(
      ssoIconSource("<svg><style>.a{fill:#fff}</style><path /></svg>"),
    ).toBeUndefined();
  });

  it("refuses a URL scheme the browser would not treat as an image", () => {
    expect(ssoIconSource("javascript:alert(1)")).toBeUndefined();
    expect(ssoIconSource("data:text/html;base64,PHNjcmlwdD4=")).toBeUndefined();
    expect(ssoIconSource("//evil.example.com/icon.svg")).toBeUndefined();
    expect(ssoIconSource("icons/github.svg")).toBeUndefined();
  });

  it("refuses markup too large to belong in a button", () => {
    expect(
      ssoIconSource(`<svg>${"<path />".repeat(4_000)}</svg>`),
    ).toBeUndefined();
  });
});
