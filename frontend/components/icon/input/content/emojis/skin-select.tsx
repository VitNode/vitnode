import { useTranslations } from "next-intl";
import { Check } from "lucide-react";

import { CONFIG } from "@/config";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const skinToneEmoji = [
  "43.55deg 100% 61.37%",
  "29.17deg 100% 85.88%",
  "28.64deg 64.71% 73.33%",
  "25.05deg 48.36% 58.24%",
  "24.11deg 51.85% 42.35%",
  "20.53deg 25.68% 29.02%"
];

interface Props {
  setSkinToneIndex: (value: number) => void;
  skinToneIndex: number;
}

export const SkinSelectEmojisContentIconInput = ({
  setSkinToneIndex,
  skinToneIndex
}: Props) => {
  const t = useTranslations("core.editor.emoji");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="flex-shrink-0 w-9 h-9"
          size="icon"
          variant="ghost"
          ariaLabel={t("skin.title")}
        >
          <div
            className="w-5 h-5 rounded-md"
            style={{ backgroundColor: `hsl(${skinToneEmoji[skinToneIndex]})` }}
          />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        {skinToneEmoji.map((item, index) => (
          <DropdownMenuItem
            key={item}
            className="flex gap-2"
            onClick={() => {
              localStorage.setItem(
                CONFIG.local_storage.editor_skin_tone,
                index.toString()
              );
              setSkinToneIndex(index);
            }}
          >
            {skinToneIndex === index && <Check className="h-4 w-4" />}
            <div
              className="w-5 h-5 rounded-md"
              style={{ backgroundColor: `hsl(${skinToneEmoji[index]})` }}
            />
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-expect-error */}
            <span>{t(`skin.skin_${index}`)}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
