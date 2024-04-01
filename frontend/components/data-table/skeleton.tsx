import { Skeleton } from "../ui/skeleton";

export const SkeletonDataTable = (): JSX.Element => {
  return (
    <div className="rounded-md border">
      <div className="border-b h-12 p-4 flex gap-5">
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-full h-4" />
      </div>

      <div className="flex flex-col gap-2 p-4">
        <Skeleton className="w-full h-8" />
        <Skeleton className="w-full h-8" />
      </div>
    </div>
  );
};
