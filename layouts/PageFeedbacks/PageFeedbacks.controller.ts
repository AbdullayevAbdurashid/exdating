import { useCallback, useEffect, useMemo, useState } from "react";
import { useSWRInfinite } from "swr";

// Import CONTEXTS
import { context } from "context";

// Import API
import { getTopUsers, subscribeToUser } from "api/user";

// Import UTILS
import { fetcher } from "utils";

const usePageFeedbacksController = (
  initialFeedbacksData: APIResponseWithData<SearchGlobalResponse>,
  queryParams: FeedbacksSearchQueryForm,
  isFormDirty: boolean
) => {
  const { enterField, tags, sorted, countries } = queryParams;

  // UTILS
  const { getFetcherSWR, postFetcherSWR } = fetcher;

  // CONTEXTS
  const { useUserContext } = context;
  const { user: self } = useUserContext();

  // FETCHER
  const { data: feedbackSearchData, setSize, size } = useSWRInfinite(
    (index) => [
      `/search?page=${index + 1}`,
      enterField,
      tags,
      sorted,
      countries,
    ],
    (src, ef, t, s, co) =>
      postFetcherSWR<SearchGlobalResponse>(src, {
        enterField: ef,
        filters: {
          hashtag: t,
          sorted: s,
          country_iso_code: co,
        },
      }),
    { revalidateOnFocus: false }
  );

  const [feedbacksDataList, setFeedbacksDataList] = useState<FeedbackSearch[]>(
    []
  );

  useEffect(() => {
    console.log("feedbackSearchData: ", feedbackSearchData);
  }, [feedbackSearchData]);

  useEffect(() => {
    if (feedbackSearchData != null) {
      let data: FeedbackSearch[] = [];

      feedbackSearchData.forEach((feedback) => {
        if (feedback.status) {
          data = [...data, ...feedback.payload.data];
        }
      });

      setFeedbacksDataList(data);
    }
  }, [feedbackSearchData]);

  // useEffect(() => {
  //   let timeoutId: null | NodeJS.Timeout = null;

  //   function updateFeedbacks() {
  //     console.log("updateFeedbacks!!!");
  //     fRevalidate();
  //   }

  //   if (isFormDirty) {
  //     timeoutId = setTimeout(updateFeedbacks, 1000);
  //   }

  //   return () => {
  //     if (timeoutId != null) {
  //       clearTimeout(timeoutId);
  //     }
  //   };
  // }, [enterField, isFormDirty]);

  const isCanLoadMore = useMemo(() => {
    if (feedbackSearchData && feedbackSearchData.length > 0) {
      const lastData = feedbackSearchData[feedbackSearchData.length - 1];

      if (lastData.status && lastData.payload.next_page_url != null) {
        return true;
      }
    }

    return false;
  }, [feedbackSearchData]);

  const loadMoreFeedbacks = useCallback(() => {
    setSize(size + 1);
  }, [setSize, size]);

  const states = {
    feedbacksList: feedbacksDataList,
    isCanLoadMore,
    isLoading: false,
    self,
  };
  const actions = { loadMoreFeedbacks };

  return { states, actions };
};

export default usePageFeedbacksController;
