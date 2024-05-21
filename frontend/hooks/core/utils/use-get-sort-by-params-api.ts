import { useSearchParams } from "next/navigation";

import { SortDirectionEnum } from "@/graphql/hooks";

export function useGetSortByParamsAPI<T extends Record<string, unknown>>({
  constEnum
}: {
  constEnum?: T;
}): {
  column: keyof T;
  direction: SortDirectionEnum;
} | null {
  const searchParams = useSearchParams();
  const sort = {
    by: searchParams.get("sortBy")?.toLowerCase(),
    direction: searchParams.get("sortDirection")?.toLowerCase()
  };

  if (
    !constEnum ||
    !sort.by ||
    !sort.direction ||
    !(sort.by in constEnum) ||
    !(sort.direction in SortDirectionEnum)
  ) {
    return null;
  }

  return {
    column: sort.by as keyof T,
    direction:
      sort.direction === "asc" ? SortDirectionEnum.asc : SortDirectionEnum.desc
  };
}
