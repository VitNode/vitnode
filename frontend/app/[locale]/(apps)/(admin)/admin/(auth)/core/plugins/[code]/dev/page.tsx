import { notFound } from "next/navigation";

import { CONFIG } from "@/config";
import { fetcher } from "@/graphql/fetcher";
import {
  Admin__Core_Plugins__Show__Item,
  type Admin__Core_Plugins__Show__ItemQuery,
  type Admin__Core_Plugins__Show__ItemQueryVariables
} from "@/graphql/hooks";

interface Props {
  params: {
    code: string;
  };
}

const getData = async (
  variables: Admin__Core_Plugins__Show__ItemQueryVariables
) => {
  const { data } = await fetcher<
    Admin__Core_Plugins__Show__ItemQuery,
    Admin__Core_Plugins__Show__ItemQueryVariables
  >({
    query: Admin__Core_Plugins__Show__Item,
    variables
  });

  return data;
};

export default async function Page({ params: { code } }: Props) {
  if (!CONFIG.node_development) notFound();

  const data = await getData({ code });
  if (data.admin__core_plugins__show.edges.length === 0) notFound();

  return <div>Plugin</div>;
}
