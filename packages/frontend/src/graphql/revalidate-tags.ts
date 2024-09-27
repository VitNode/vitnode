import { revalidateTag } from 'next/cache';

export enum RevalidateTagEnum {
  Core_Global = 'core_global',
  Core_Session = 'core_session',
  Core_Members__Profiles = 'core_members__profiles',
}

export const revalidateTags = {
  session: (userId: number) => {
    if (userId) {
      revalidateTag(`${RevalidateTagEnum.Core_Session}--${userId}`);
    }
    // Revalidate tag also for guest users
    revalidateTag(RevalidateTagEnum.Core_Session);
  },
  sessionAdmin: (userId: number) => {
    if (userId) {
      revalidateTag(`${RevalidateTagEnum.Core_Session}--${userId}`);
    }
    // Revalidate tag also for guest users
    revalidateTag(RevalidateTagEnum.Core_Session);
  },
};
