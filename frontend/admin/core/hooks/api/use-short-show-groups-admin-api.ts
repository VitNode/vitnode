import { useQuery } from "@tanstack/react-query";
import * as React from "react";

import { APIKeys } from "@/graphql/api-keys";
import { queryApi } from "./query-api";

export const useShortShowGroupsAdminAPI = () => {
  const [textSearch, setTextSearch] = React.useState("");

  const api = useQuery({
    queryKey: [APIKeys.SHORT_GROUPS_MEMBERS, { textSearch }],
    queryFn: async () =>
      queryApi({
        first: 25,
        search: textSearch
      }),
    refetchOnMount: true
  });

  return { ...api, setTextSearch };
};
