import { Metadata } from "next";
import { notFound } from "next/navigation";
import * as React from "react";

import { ProfileViewProps } from "@/themes/1/core/views/profile/profile-view";
import {
  Core_Members__Profiles,
  Core_Members__ProfilesQuery,
  Core_Members__ProfilesQueryVariables
} from "@/utils/graphql/hooks";
import { getSessionData } from "@/functions/get-session-data";
import { fetcher } from "@/utils/graphql/fetcher";

const getData = async ({ id }: { id: string }) => {
  const { data } = await fetcher<
    Core_Members__ProfilesQuery,
    Core_Members__ProfilesQueryVariables
  >({
    query: Core_Members__Profiles,
    variables: {
      first: 1,
      nameSeo: id
    },
    cache: "force-cache"
  });

  return data;
};

interface Props {
  params: { id: string };
}

export async function generateMetadata({
  params: { id }
}: Props): Promise<Metadata> {
  const api = await getData({ id });
  const data = api.core_members__show.edges.at(0);
  if (!data) return {};

  return {
    title: data.name
  };
}

export default async function Page({ params: { id } }: Props) {
  const data = await getData({ id });

  if (data.core_members__show.edges.length === 0) {
    notFound();
  }

  const { theme_id } = await getSessionData();
  const PageFromTheme: React.LazyExoticComponent<
    (props: ProfileViewProps) => JSX.Element
  > = React.lazy(async () =>
    import(`@/themes/${theme_id}/core/views/profile/profile-view`).catch(
      async () => import("@/themes/1/core/views/profile/profile-view")
    )
  );

  return <PageFromTheme data={data} />;
}
