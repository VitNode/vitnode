import type { QueryClient } from "@tanstack/react-query";

import { notFound } from "@tanstack/react-router";
import { createTranslator } from "use-intl";

import type { UserProfile } from "@/views/profile/profile-query";

import {
  isProfileNotFound,
  normalizeProfileNameCode,
} from "@/views/profile/profile-query";

import { intlQueryOptions } from "../i18n/query";
import { userProfileQuery } from "./query";

export const PROFILE_NAMESPACES = ["core.global", "core.profile"] as const;

export interface ProfileLoaderContext {
  locale: string;
  queryClient: QueryClient;
}

export interface ProfileRouteData {
  description: string;
  nameCode: string;
  title: string;
}

const ensureProfile = async (
  queryClient: QueryClient,
  nameCode: string,
): Promise<UserProfile> => {
  try {
    return await queryClient.query({
      ...userProfileQuery(nameCode),
      staleTime: "static",
    });
  } catch (error) {
    if (isProfileNotFound(error)) {
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      throw notFound();
    }

    throw error;
  }
};

export const loadProfileRoute = async ({
  locale,
  nameCode: raw,
  queryClient,
}: ProfileLoaderContext & { nameCode: string }): Promise<ProfileRouteData> => {
  const nameCode = normalizeProfileNameCode(raw);
  if (nameCode === null) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw notFound();
  }

  const [intl, user] = await Promise.all([
    queryClient.query({
      ...intlQueryOptions({ locale, namespaces: PROFILE_NAMESPACES }),
      staleTime: "static",
    }),
    ensureProfile(queryClient, nameCode),
  ]);

  const t = createTranslator({
    locale,
    messages: intl.messages as {
      core: { profile: { metaDesc: string; title: string } };
    },
    namespace: "core.profile",
  });
  const values = { name: user.name, nameCode: user.nameCode };

  return {
    description: t("metaDesc", values),
    nameCode: user.nameCode,
    title: t("title", values),
  };
};
