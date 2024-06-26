import { Button } from 'vitnode-frontend/components/ui/button';
import { useTextLang } from 'vitnode-frontend/hooks/use-text-lang';
import { AvatarUser } from 'vitnode-frontend/components/ui/user/avatar';

import { Core_Members__ProfilesQuery } from '@/graphql/hooks';

interface Props {
  data: Core_Members__ProfilesQuery;
}

export const ProfileView = ({ data: dataApi }: Props) => {
  const { convertText } = useTextLang();

  const { edges } = dataApi.core_members__show;
  const data = edges.at(0);
  if (!data) return null;

  return (
    <>
      <div className="bg-card">
        <div className="container">
          <div className="bg-secondary h-40 rounded-b-md" />
          <div className="-mt-24 flex flex-col items-center gap-2 px-5 pb-5 md:-mt-16 md:flex-row md:items-end md:gap-4">
            <AvatarUser sizeInRem={8} user={data} />

            <div className="flex w-full flex-col gap-4 text-center md:mt-20 md:flex-row md:text-left">
              <div className="flex flex-col items-center gap-1 md:mr-auto md:items-start">
                <h1 className="text-2xl font-semibold">{data.name}</h1>
                <span>{convertText(data.group.name)}</span>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2 md:justify-end">
                <Button>Test 123</Button>
                <Button>Test 123</Button>
                <Button>Test 123</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-6">test</div>
    </>
  );
};
