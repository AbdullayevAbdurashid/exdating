import { useCallback, useEffect, useMemo, useState } from "react";
import useSWR from "swr";

// Import API
import { subscribeToUser, unsubscribeFromUser } from "api/user";

// Import UTILS
import { fetcher } from "utils";

const usePageProfileController = (
  userProfileData: UserProfile | UserSelf,
  selfSubscriptions?: APIResponseWithData<SubscriptionListResponse>,
  isMyProfile?: boolean
) => {
  // UTILS
  const { getFetcherSWR } = fetcher;

  // FETCHER
  const {
    data: subscriptionsData,
    mutate: mutateSelfSubscriptions,
  } = useSWR(
    "/subscriptions?size=9999",
    (url) => getFetcherSWR<SubscriptionListResponse>(url),
    { initialData: selfSubscriptions }
  );

  const isSubscribed = useMemo(() => {
    if (!isMyProfile && subscriptionsData != null && subscriptionsData.status) {
      return subscriptionsData.payload.data.some(
        (subscription) => subscription.user_id === userProfileData.id
      );
    }

    return false;
  }, [isMyProfile, subscriptionsData, userProfileData]);

  const handleSubscribeToUser = useCallback(
    async (userId: number) => {
      if (isSubscribed) {
        await unsubscribeFromUser(userId);
      } else {
        await subscribeToUser(userId);
      }

      mutateSelfSubscriptions();
    },
    [isSubscribed]
  );

  const states = { isSubscribed };
  const actions = { handleSubscribeToUser };

  return { actions, states };
};

export default usePageProfileController;
