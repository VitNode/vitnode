import { queryOptions } from "@tanstack/react-query";

import type { UniversalFetcher } from "@/lib/fetcher-client";
import type { UserImageKind, UserImagePolicy } from "@/lib/user-images";

import { userImagesModule } from "@/api/modules.client";
import { fetcherClient } from "@/lib/fetcher-client";
import { OPERATIONAL_STALE_TIME } from "@/lib/query-freshness";
import { readApiErrorMessage } from "@/lib/read-api-error";

import { PROFILE_QUERY_ROOT } from "../profile-query";

const IMAGES_PREFIX_PATH = "/users";

export type UserImagePolicyFetcher = () => Promise<UserImagePolicy>;

export const userImagePolicyFetcher =
  (transport: UniversalFetcher): UserImagePolicyFetcher =>
  async () => {
    const response = await transport(userImagesModule, {
      method: "get",
      module: "images",
      path: "/policy",
      prefixPath: IMAGES_PREFIX_PATH,
    });

    if (!response.ok) {
      throw new Error(`The image policy route answered ${response.status}.`);
    }

    return await response.json();
  };

export const fetchUserImagePolicyInBrowser: UserImagePolicyFetcher =
  userImagePolicyFetcher(fetcherClient);

export const userImagePolicyQueryKey = () =>
  [...PROFILE_QUERY_ROOT, "images", "policy"] as const;

export const userImagePolicyQueryOptions = ({
  fetchPolicy = fetchUserImagePolicyInBrowser,
}: { fetchPolicy?: UserImagePolicyFetcher } = {}) =>
  queryOptions({
    queryFn: async () => await fetchPolicy(),
    queryKey: userImagePolicyQueryKey(),
    retry: false,
    staleTime: OPERATIONAL_STALE_TIME,
  });

export class UserImageRequestError extends Error {
  constructor(status: number, message: string) {
    super(message);
    this.name = "UserImageRequestError";
    this.status = status;
  }

  readonly status: number;
}

const rejectionOf = async (
  response: Response,
  fallback: string,
): Promise<UserImageRequestError> =>
  new UserImageRequestError(
    response.status,
    (await readApiErrorMessage(response)) ?? fallback,
  );

export const uploadOwnUserImage = async (
  kind: UserImageKind,
  file: File,
): Promise<{ url: string }> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetcherClient(userImagesModule, {
    args: { params: { kind } },
    formData,
    method: "post",
    module: "images",
    path: "/{kind}",
    prefixPath: IMAGES_PREFIX_PATH,
  });

  if (!response.ok) {
    throw await rejectionOf(
      response,
      `The upload answered ${response.status}.`,
    );
  }

  return await response.json();
};

export const removeOwnUserImage = async (
  kind: UserImageKind,
): Promise<void> => {
  const response = await fetcherClient(userImagesModule, {
    args: { params: { kind } },
    method: "delete",
    module: "images",
    path: "/{kind}",
    prefixPath: IMAGES_PREFIX_PATH,
  });

  if (!response.ok) {
    throw await rejectionOf(
      response,
      `The removal answered ${response.status}.`,
    );
  }
};
