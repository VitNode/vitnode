import { Link } from '../../../i18n';

interface Props {
  user: {
    id: string;
    name: string;
  };
  className?: string;
}

export const LinkUser = ({ className, user: { id, name } }: Props) => {
  return (
    <Link href={`/profile/${id}`} className={className}>
      {name}
    </Link>
  );
};
