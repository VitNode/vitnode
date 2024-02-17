import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { APIKeys } from "@/graphql/api-keys";
import { queryApi } from "./query-api";

export const useShortShowGroupsAdminAPI = () => {
  const [textSearch, setTextSearch] = useState("");

  const api = useQuery({
    queryKey: [APIKeys.SHORT_GROUPS_MEMBERS, { textSearch }],
    queryFn: async () => {
      return await queryApi({
        first: 25,
        search: textSearch
      });
    },
    refetchOnMount: true
  });

  return { ...api, setTextSearch };
};
