import { DashboardCoreAdminView } from "@/admin/core/views/core/dashboard/dashboard-core-admin-view";
import { fetcher } from "@/graphql/fetcher";
import {
  Admin__Core__Dashboard,
  type Admin__Core__DashboardQuery,
  type Admin__Core__DashboardQueryVariables
} from "@/graphql/hooks";

const getData = async (variables: Admin__Core__DashboardQueryVariables) => {
  const { data } = await fetcher<
    Admin__Core__DashboardQuery,
    Admin__Core__DashboardQueryVariables
  >({
    query: Admin__Core__Dashboard,
    variables
  });

  return data;
};

export default async function Page() {
  const data = await getData({});

  return <DashboardCoreAdminView data={data} />;
}
