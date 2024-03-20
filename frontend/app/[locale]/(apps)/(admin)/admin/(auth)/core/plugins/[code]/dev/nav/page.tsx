import { NavDevPluginAdminView } from "@/admin/core/views/core/plugins/views/dev/nav/nav";
import { fetcher } from "@/graphql/fetcher";
import {
  Admin__Core_Plugins__Nav__Show,
  type Admin__Core_Plugins__Nav__ShowQuery,
  type Admin__Core_Plugins__Nav__ShowQueryVariables
} from "@/graphql/hooks";

interface Props {
  params: {
    code: string;
  };
}

const getData = async (
  variables: Admin__Core_Plugins__Nav__ShowQueryVariables
) => {
  const { data } = await fetcher<
    Admin__Core_Plugins__Nav__ShowQuery,
    Admin__Core_Plugins__Nav__ShowQueryVariables
  >({
    query: Admin__Core_Plugins__Nav__Show,
    variables
  });

  return data;
};

export default async function Page({ params: { code } }: Props) {
  const data = await getData({ pluginCode: code });

  return <NavDevPluginAdminView {...data} />;
}
