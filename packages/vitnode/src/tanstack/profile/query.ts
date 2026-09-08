import type { UserProfileFetcher } from "@/views/profile/profile-query";

import { fetcher } from "@/tanstack/fetcher";
import {
  userProfileFetcher,
  userProfileQueryOptions,
} from "@/views/profile/profile-query";

const fetchProfile: UserProfileFetcher = userProfileFetcher(fetcher);

/** One public profile, for the screen, its loader and its breadcrumb. */
export const userProfileQuery = (nameCode: string) =>
  userProfileQueryOptions({ fetchProfile, nameCode });
