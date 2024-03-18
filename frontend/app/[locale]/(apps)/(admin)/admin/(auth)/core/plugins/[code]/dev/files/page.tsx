import { FilesDevPluginAdminView } from "@/admin/core/views/core/plugins/views/dev/files/files";
import { fetcher } from "@/graphql/fetcher";
import {
  Admin__Core_Plugins__Files,
  type Admin__Core_Plugins__FilesQuery,
  type Admin__Core_Plugins__FilesQueryVariables
} from "@/graphql/hooks";

interface Props {
  params: {
    code: string;
  };
}

const getData = async (variables: Admin__Core_Plugins__FilesQueryVariables) => {
  const { data } = await fetcher<
    Admin__Core_Plugins__FilesQuery,
    Admin__Core_Plugins__FilesQueryVariables
  >({
    query: Admin__Core_Plugins__Files,
    variables
  });

  return data;
};

export default async function Page({ params: { code } }: Props) {
  const data = await getData({ code });

  return <FilesDevPluginAdminView {...data} />;
}
