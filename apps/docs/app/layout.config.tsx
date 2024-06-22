import { type BaseLayoutProps } from "fumadocs-ui/layout";

// basic configuration here
export const baseOptions: BaseLayoutProps = {
  githubUrl: "https://github.com/aXenDeveloper/VitNode",
  nav: {
    title: "My App"
  },
  links: [
    {
      text: "Documentation",
      url: "/docs",
      active: "nested-url"
    }
  ]
};
