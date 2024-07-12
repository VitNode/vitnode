import { BookOpenText, MessagesSquare } from "lucide-react";

import {
  ItemPluginsSectionHome,
  type ItemPluginsSectionHomeProps
} from "./item";

const items: ItemPluginsSectionHomeProps[] = [
  {
    name: "Blog",
    href: "/blog",
    icon: <BookOpenText />
  },
  {
    name: "Forum",
    href: "/forum",
    icon: <MessagesSquare />
  }
];

export const PluginsSectionHome = () => {
  return (
    <div className="bg-card">
      <div className="container">
        <ul className="py-10 flex items-center justify-center">
          {items.map(item => (
            <ItemPluginsSectionHome key={item.href} {...item} />
          ))}
        </ul>
      </div>
    </div>
  );
};
