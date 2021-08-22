import { useCallback, useEffect, useMemo } from "react";
import useSWR, { useSWRInfinite } from "swr";

// Import CONTEXTS
import { context } from "context";

// Import API
import { subscribeToUser, unsubscribeFromUser } from "api/user";

// Import UTILS
import { fetcher } from "utils";

const useTopUserPageController = (
  initialTopUsers: APIResponseWithData<TopUserResponse>,
  subscriptions: APIResponseWithData<SubscriptionListResponse>
) => {
  // UTILS
  const { getFetcherSWR } = fetcher;

  // CONTEXTS
  const { useUserContext } = context;
  const { user: self } = useUserContext();

  // FETCHER
  const {
    data: subData,
    mutate: subMutate,
  } = useSWR(
    "/subscriptions?size=9999",
    (url) => getFetcherSWR<SubscriptionListResponse>(url),
    { initialData: subscriptions }
  );

  const {
    data: topUsersData,
    mutate: mutateTopUsersData,
    setSize,
    size,
  } = useSWRInfinite(
    (index) => [`/user/top?page=${index + 1}`],
    (src) => getFetcherSWR<TopUserResponse>(src),
    { initialData: [initialTopUsers] }
  );

  useEffect(() => {
    console.log("subscriptionData: ", subData);
  }, [subData]);

  useEffect(() => {
    console.log("TopUser content: ", topUsersData);
  }, [topUsersData]);

  const isCanLoadMoreTopUsers = useMemo(() => {
    if (topUsersData != null && topUsersData.length > 0) {
      const last = topUsersData[topUsersData.length - 1];

      if (last.status && last.payload.next_page_url != null) {
        return true;
      }
    }
    return false;
  }, [topUsersData]);

  const handleLoadMoreTopUsers = useCallback(() => {
    setSize(size + 1);
  }, [size]);

  const checkIsUserSubscribed = useCallback(
    (subUserId: number) => {
      if (subData == null || !subData.status) {
        return false;
      }

      let isSubscribed = false;

      subData.payload.data.every((subscription) => {
        if (subscription.user_id === subUserId) {
          isSubscribed = true;
          return false;
        }

        return true;
      });

      return isSubscribed;
    },
    [subData]
  );

  const subscribe = useCallback(
    async (userId: number) => {
      const isUserAleadySubscribed = checkIsUserSubscribed(userId);

      if (isUserAleadySubscribed) {
        const unsubResponse = await unsubscribeFromUser(userId);

        console.log("unsubResponse: ", unsubResponse);
      } else {
        const subResponse = await subscribeToUser(userId);

        console.log("subResponse: ", subResponse);
      }

      subMutate();
    },
    [checkIsUserSubscribed, checkIsUserSubscribed]
  );

  const states = { topUsersData, isCanLoadMoreTopUsers, self };
  const actions = {
    handleLoadMoreTopUsers,
    subscribe,
    checkIsUserSubscribed,
  };

  return { states, actions };
};

export default useTopUserPageController;
