import { useCallback, useEffect, useMemo } from "react";
import useSWR from "swr";

// Import API
import { subscribeToUser, unsubscribeFromUser } from "api/user";

// Import UTILS
import { fetcher } from "utils";

const useUserSubscriptionService = (
  user: UserBase,
  selfSubscriptions?: APIResponseWithData<SubscriptionListResponse> | null
) => {
  // UTILS
  const { getFetcherSWR } = fetcher;

  // FETCHER
  const {
    data: subscriptionsData,
    mutate: mutateSelfSubscriptions,
  } = useSWR(
    selfSubscriptions ? "/subscriptions?size=9999" : null,
    (url) => getFetcherSWR<SubscriptionListResponse>(url),
    { initialData: selfSubscriptions }
  );

  useEffect(() => {
    console.log("subscriptionsData: ", subscriptionsData);
  }, [subscriptionsData]);

  const isSubscribed = useMemo(() => {
    if (subscriptionsData != null && subscriptionsData.status) {
      return subscriptionsData.payload.data.some(
        (subscription) => subscription.user_id === user.id
      );
    }

    return false;
  }, [user, subscriptionsData]);

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

  const actions = { handleSubscribeToUser };
  const states = { isSubscribed };

  return { states, actions };
};

export default useUserSubscriptionService;
