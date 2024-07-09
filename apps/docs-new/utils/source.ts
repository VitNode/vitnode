import { createMDXSource, defaultSchemas } from 'fumadocs-mdx';
import { z } from 'zod';
import { loader } from 'fumadocs-core/source';
import { icons } from 'lucide-react';
import { create } from '@/components/ui/icon';
import { map } from '@/.map';

export const utils = loader({
  baseUrl: '/docs',
  rootDir: 'docs',
  icon(icon) {
    if (icon && icon in icons)
      return create({ icon: icons[icon as keyof typeof icons] });
  },
  source: createMDXSource(map, {
    schema: {
      frontmatter: defaultSchemas.frontmatter.extend({
        preview: z.string().optional(),
        index: z.boolean().default(false),
      }),
    },
  }),
});
