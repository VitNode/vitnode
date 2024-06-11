import { useQuery } from "@tanstack/react-query";
import * as React from "react";

import { queryApi } from "./query-api";

export const useShortShowGroupsAdminAPI = () => {
  const [textSearch, setTextSearch] = React.useState("");

  const api = useQuery({
    queryKey: ["SHORT_GROUPS_MEMBERS", { textSearch }],
    queryFn: async () =>
      queryApi({
        first: 25,
        search: textSearch
      }),
    refetchOnMount: true
  });

  return { ...api, setTextSearch };
};
