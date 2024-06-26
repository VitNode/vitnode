import { TextLanguage } from '../../../graphql/code';
import { useTextLang } from '../../../hooks/use-text-lang';

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
