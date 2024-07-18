import { TextLanguage } from '../../../graphql/graphql';
import { useTextLang } from '../../../hooks/use-text-lang';

export const GroupFormat = ({
  className,
  group: { name },
}: {
  group: {
    name: TextLanguage[];
  };
  className?: string;
}) => {
  const { convertText } = useTextLang();

  return <span className={className}>{convertText(name)}</span>;
};
