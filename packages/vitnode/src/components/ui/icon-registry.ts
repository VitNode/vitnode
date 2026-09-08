import type React from "react";

import {
  componentNameToIconName,
  iconNameToComponentName,
} from "@/lib/emoji-icon";

export type LucideIconComponent = React.ComponentType<{
  absoluteStrokeWidth?: boolean;
  className?: string;
  size?: number | string;
  strokeWidth?: number | string;
}>;

export interface LucideIconRegistry {
  get: (name: string) => LucideIconComponent | undefined;
  names: string[];
}

let registry: Promise<LucideIconRegistry> | undefined;

// eslint-disable-next-line @typescript-eslint/promise-function-async
export const loadLucideIcons = (): Promise<LucideIconRegistry> => {
  registry ??= import("lucide-react").then(({ icons }) => {
    const components = icons as unknown as Record<
      string,
      LucideIconComponent | undefined
    >;
    const names = Object.keys(components).map(componentNameToIconName).sort();

    return {
      get: (name: string) => components[iconNameToComponentName(name)],
      names,
    };
  });

  return registry;
};
