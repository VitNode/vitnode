import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { lazy, type LazyExoticComponent } from "react";

import { type ProfileViewProps } from "@/themes/1/core/views/profile/profile-view";
import { fetcher } from "@/graphql/fetcher";
import {
  Core_Members__Profiles,
  type Core_Members__ProfilesQuery,
  type Core_Members__ProfilesQueryVariables
} from "@/graphql/hooks";
import { getSessionData } from "@/functions/get-session-data";

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
  const PageFromTheme: LazyExoticComponent<
    (props: ProfileViewProps) => JSX.Element
  > = lazy(() =>
    import(`@/themes/${theme_id}/core/views/profile/profile-view`).catch(
      () => import("@/themes/1/core/views/profile/profile-view")
    )
  );

  return <PageFromTheme data={data} />;
}
