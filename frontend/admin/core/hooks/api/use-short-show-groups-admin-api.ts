import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { APIKeys } from "@/graphql/api-keys";
import { fetcher } from "@/graphql/fetcher";
import {
  Admin__Core_Groups__Show_Short,
  type Admin__Core_Groups__Show_ShortQuery,
  type Admin__Core_Groups__Show_ShortQueryVariables
} from "@/graphql/hooks";

export const useShortShowGroupsAdminAPI = () => {
  const [textSearch, setTextSearch] = useState("");

  const api = useQuery({
    queryKey: [APIKeys.SHORT_GROUPS_MEMBERS, { textSearch }],
    queryFn: async ({ signal }) => {
      const { data } = await fetcher<
        Admin__Core_Groups__Show_ShortQuery,
        Admin__Core_Groups__Show_ShortQueryVariables
      >({
        query: Admin__Core_Groups__Show_Short,
        variables: {
          first: 25,
          search: textSearch
        },
        signal
      });

      return data;
    },
    refetchOnMount: true
  });

  return { ...api, setTextSearch, textSearch };
};
