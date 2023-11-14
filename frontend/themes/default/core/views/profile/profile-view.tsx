import { AvatarUser } from '@/components/user/avatar/avatar-user';
import { Button } from '@/components/ui/button';

export const ProfileView = () => {
  return (
    <>
      <div className="bg-card">
        <div className="container">
          <div className="bg-secondary h-40 rounded-b-md" />
          <div className="sm:-mt-16 -mt-24 px-8 pb-2 flex flex-col md:flex-row md:items-end items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:gap-4 gap-2 items-center sm:items-end">
              <AvatarUser className="border-card border-4" sizeInRem={8} />

              <div className="flex flex-col pb-2 text-center sm:text-left">
                <h1 className="font-semibold text-2xl">aXenDeveloper</h1>
                <span>Administrator</span>
              </div>
            </div>

            <div className="pb-4 flex flex-wrap justify-center items-center gap-2">
              <Button>Test 123</Button>
              <Button>Test 123</Button>
              <Button>Test 123</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-6">test</div>
    </>
  );
};
