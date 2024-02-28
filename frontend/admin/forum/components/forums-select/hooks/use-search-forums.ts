import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { queryApi } from "./admin-query-api";

export const useSearchForums = () => {
  const [search, setSearch] = useState("");

  const query = useQuery({
    queryKey: ["Forum_Forums__Show_Short", { search }],
    queryFn: async () =>
      await queryApi({
        first: 10,
        search,
        showAllForums: true
      })
  });

  const data = query.data?.admin__forum_forums__show.edges ?? [];

  return { ...query, setSearch, data };
};
