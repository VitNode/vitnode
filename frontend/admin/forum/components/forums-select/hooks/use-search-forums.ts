import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { queryApi } from "./admin-query-api";

interface Args {
  exclude?: number[];
}

export const useSearchForums = ({ exclude }: Args) => {
  const [search, setSearch] = useState("");

  const query = useQuery({
    queryKey: ["Forum_Forums__Show_Short", { search }],
    queryFn: async () =>
      queryApi({
        first: 10,
        search,
        showAllForums: true
      })
  });

  const data =
    query.data?.admin__forum_forums__show.edges.filter(
      item => !exclude?.includes(item.id)
    ) ?? [];

  return { ...query, setSearch, data };
};
