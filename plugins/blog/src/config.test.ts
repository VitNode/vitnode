// @vitest-environment node
import { isVitNodePluginDefinition } from "@vitnode/core/config";
import { describe, expect, it } from "vitest";

import { BLOG_PLUGIN_DEFAULTS, blogPlugin } from "./config";

describe("blogPlugin", () => {
  it("returns a framework-neutral descriptor with the defaults", () => {
    const plugin = blogPlugin();

    expect(isVitNodePluginDefinition(plugin)).toBe(true);
    expect(plugin.pluginId).toBe("@vitnode/blog");
    expect(plugin.options).toEqual(BLOG_PLUGIN_DEFAULTS);
    expect(plugin.discovery).toBe("declared");
    expect(plugin.entries).toEqual({
      adminContent: "@vitnode/blog/admin/content",
      adminNav: "@vitnode/blog/admin/nav",
      api: "@vitnode/blog/config.api",
    });
  });

  it("accepts typed overrides", () => {
    expect(blogPlugin({ postsPerPage: 5 }).options).toEqual({
      postsPerPage: 5,
      publicApi: true,
    });
    expect(blogPlugin({ publicApi: false }).options.publicApi).toBe(false);
  });

  it("exposes only the page size to the browser", () => {
    const plugin = blogPlugin({ postsPerPage: 12, publicApi: false });

    expect(plugin.publicOptions).toEqual({ postsPerPage: 12 });
    expect("publicApi" in (plugin.publicOptions ?? {})).toBe(false);
  });

  it.each([0, 51, 2.5, Number.NaN])("rejects postsPerPage %s", value => {
    expect(() => blogPlugin({ postsPerPage: value })).toThrow(
      /Plugin "@vitnode\/blog" rejected its options: postsPerPage/,
    );
  });

  it("rejects a non-boolean publicApi", () => {
    expect(() => blogPlugin({ publicApi: "yes" as never })).toThrow(
      /publicApi has to be a boolean/,
    );
  });
});
