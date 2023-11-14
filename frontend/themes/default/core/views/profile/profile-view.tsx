import { Button } from '@/components/ui/button';
import { DataWrapperProfileView } from '@/hooks/core/profiles/use-profile-view';
import { NameProfile } from './name-profile';
import { AvatarProfile } from './avatar-profile';

export const ProfileView = () => {
  return (
    <DataWrapperProfileView>
      <div className="bg-card">
        <div className="container">
          <div className="bg-secondary h-40 rounded-b-md" />
          <div className="md:-mt-16 -mt-24 px-5 pb-5 flex flex-col md:flex-row md:items-end items-center md:gap-4 gap-2">
            <AvatarProfile />

            <div className="flex flex-col md:flex-row text-center md:text-left md:mt-20 w-full gap-4">
              <div className="flex flex-col md:items-start items-center md:mr-auto gap-1">
                <NameProfile />
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
    </DataWrapperProfileView>
  );
};
