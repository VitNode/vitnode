import { Button } from '@/components/ui/button';
import type { Core_Members__ProfilesQuery } from '@/graphql/hooks';
import { AvatarUser } from '@/components/user/avatar/avatar-user';
import { useTextLang } from '@/hooks/core/use-text-lang';

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
          <div className="md:-mt-16 -mt-24 px-5 pb-5 flex flex-col md:flex-row md:items-end items-center md:gap-4 gap-2">
            <AvatarUser sizeInRem={8} user={data} />

            <div className="flex flex-col md:flex-row text-center md:text-left md:mt-20 w-full gap-4">
              <div className="flex flex-col md:items-start items-center md:mr-auto gap-1">
                <h1 className="font-semibold text-2xl">{data.name}</h1>
                <span>{convertText(data.group.name)}</span>
              </div>
              <div className="flex md:justify-end justify-center items-center gap-2 flex-wrap">
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
