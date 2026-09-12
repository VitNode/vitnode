import { definePluginFactory } from "@vitnode/core/config";

import { CONFIG_PLUGIN } from "@/const";

export const BLOG_POSTS_PER_PAGE_MIN = 1;

export const BLOG_POSTS_PER_PAGE_MAX = 50;

export interface BlogPluginOptions {
  postsPerPage: number;
  publicApi: boolean;
}

export interface BlogPluginPublicOptions {
  postsPerPage: number;
}

export const BLOG_PLUGIN_DEFAULTS: BlogPluginOptions = {
  postsPerPage: 20,
  publicApi: true,
};

const parseBlogPluginOptions = (
  options: BlogPluginOptions,
): BlogPluginOptions => {
  if (
    !Number.isInteger(options.postsPerPage) ||
    options.postsPerPage < BLOG_POSTS_PER_PAGE_MIN ||
    options.postsPerPage > BLOG_POSTS_PER_PAGE_MAX
  ) {
    throw new RangeError(
      `postsPerPage has to be an integer between ${String(BLOG_POSTS_PER_PAGE_MIN)} and ${String(BLOG_POSTS_PER_PAGE_MAX)}, got ${JSON.stringify(options.postsPerPage)}.`,
    );
  }

  if (typeof options.publicApi !== "boolean") {
    throw new TypeError(
      `publicApi has to be a boolean, got ${JSON.stringify(options.publicApi)}.`,
    );
  }

  return options;
};

export const blogPlugin = definePluginFactory<
  BlogPluginOptions,
  BlogPluginPublicOptions
>({
  pluginId: CONFIG_PLUGIN.pluginId,
  defaults: BLOG_PLUGIN_DEFAULTS,
  parse: parseBlogPluginOptions,
  toPublicOptions: ({ postsPerPage }) => ({ postsPerPage }),
});
