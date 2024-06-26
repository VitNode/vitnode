import { useTextLang } from 'vitnode-frontend/hooks/use-text-lang';

import { TextLanguage } from '@/graphql/hooks';

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
