import * as React from "react";

import * as SolidIcons24 from "@heroicons/react/24/outline";

export type IIconNames = keyof typeof SolidIcons24;

export interface IIconImportAll {
  icon: IIconNames;
}

function IconImportAll({ icon }: IIconImportAll) {
  const Comp = SolidIcons24[icon];
  return <Comp className="w-6 h-6" />;
}

export { IconImportAll };
