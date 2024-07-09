import { type BaseLayoutProps, type DocsLayoutProps } from 'fumadocs-ui/layout';
import { RootToggle } from 'fumadocs-ui/components/layout/root-toggle';
import { pageTree } from '@/app/source';
import { modes } from '../utils/modes';

// shared configuration
export const baseOptions: BaseLayoutProps = {
  nav: {
    title: 'VitNode',
  },
  links: [
    {
      text: 'Documentation',
      url: '/docs',
      active: 'nested-url',
    },
  ],
};

// docs layout configuration
export const docsOptions: DocsLayoutProps = {
  ...baseOptions,
  tree: pageTree,
  sidebar: {
    defaultOpenLevel: 0,
    banner: (
      <RootToggle
        options={modes.map(mode => ({
          url: `/docs/${mode.param}`,
          icon: (
            <mode.icon
              className="from-background/80 size-9 shrink-0 rounded-md bg-gradient-to-t p-1.5"
              style={{
                backgroundColor: `hsl(var(--${mode.param}-color)/.3)`,
                color: `hsl(var(--${mode.param}-color))`,
              }}
            />
          ),
          title: mode.name,
          description: mode.description,
        }))}
      />
    ),
  },
};
