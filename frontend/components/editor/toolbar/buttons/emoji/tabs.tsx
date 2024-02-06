import {
  Car,
  Component,
  Dumbbell,
  Flag,
  Infinity as InfinityIcon,
  Lightbulb,
  PawPrint,
  Smile,
  Sparkles,
  Utensils
} from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { cx } from "@/functions/classnames";

const categories = [
  {
    id: "all",
    icon: InfinityIcon
  },
  {
    id: "people",
    icon: Smile
  },
  {
    id: "nature",
    icon: PawPrint
  },
  {
    id: "foods",
    icon: Utensils
  },
  {
    id: "activity",
    icon: Dumbbell
  },
  {
    id: "places",
    icon: Car
  },
  {
    id: "objects",
    icon: Lightbulb
  },
  {
    id: "symbols",
    icon: Component
  },
  {
    id: "flags",
    icon: Flag
  },
  {
    id: "customs",
    icon: Sparkles
  }
];

interface Props {
  activeCategory: string;
  onResetSearch: () => void;
  searchValue: string;
  setActiveCategory: (value: string) => void;
}

export const TabsEmojiButtonEditor = ({
  activeCategory = "all",
  onResetSearch,
  searchValue,
  setActiveCategory
}: Props) => {
  const t = useTranslations("core.editor.emoji");

  return (
    <div className="border-b-2 flex justify-between">
      {categories.map(category => {
        const active = activeCategory === category.id && !searchValue;
        const Icon = category.icon;

        return (
          <Button
            key={category.id}
            className={cx("w-9 h-9 rounded-b-none relative", {
              "text-primary": active
            })}
            size="icon"
            variant="ghost"
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            tooltip={t(`categories.${category.id}`)}
            onClick={() => {
              setActiveCategory(category.id);
              onResetSearch();
            }}
          >
            <Icon />
            {active && (
              <motion.div
                className="absolute bottom-0 left-0 w-full h-1 bg-primary rounded-t-md"
                layoutId="underline"
              />
            )}
          </Button>
        );
      })}
    </div>
  );
};
