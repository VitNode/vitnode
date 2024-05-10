import type { TextLanguage } from "@/graphql/hooks";
import { useTextLang } from "@/hooks/core/use-text-lang";

interface Props {
  group: {
    name: TextLanguage[];
  };
  className?: string;
}

export const GroupFormat = ({ className, group: { name } }: Props) => {
  const { convertText } = useTextLang();

  return <span className={className}>{convertText(name)}</span>;
};
