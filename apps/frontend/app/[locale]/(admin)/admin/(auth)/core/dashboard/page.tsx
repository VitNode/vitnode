// const getData = async (variables: Admin__Core__DashboardQueryVariables) => {
//   const { data } = await fetcher<
//     Admin__Core__DashboardQuery,
//     Admin__Core__DashboardQueryVariables
//   >({
//     query: Admin__Core__Dashboard,
//     variables
//   });

import { DashboardCoreAdminView } from "@/plugins/admin/views/core/dashboard/dashboard-core-admin-view";

//   return data;
// };

export default async function Page() {
  // const data = await getData({});

  return <DashboardCoreAdminView />;
}
