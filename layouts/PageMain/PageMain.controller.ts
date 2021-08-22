import { useRouter } from "next/router";
import { useSWRInfinite } from "swr";

// Import UTILS
import { getFetcherSWR } from "utils/fetchers";

// Import CONTEXTS
import { context } from "context";
import { useCallback, useEffect, useState } from "react";

const usePageMainController = (
  initialAllFeedbacksData: APIResponseWithData<FeedbacksAllResponse>
) => {
  const router = useRouter();

  // STATES
  const [allFeedbackList, setAllFeedbackList] = useState<FeedbackBest[]>([]);
  const [isCanLoadMoreAllFeedbacks, setIsCanLoadMoreAllFeedbacks] = useState(
    false
  );

  // CONTEXTS
  const { useUserContext } = context;
  const { user: self } = useUserContext();

  // SWR
  const {
    data: allFeedbacksData,
    mutate: mutateAllFeedbacks,
    setSize,
    size,
  } = useSWRInfinite(
    (index) => [`/feedbacks?page=${index + 1}`],
    (src) => getFetcherSWR<FeedbacksAllResponse>(src),
    { initialData: [initialAllFeedbacksData] }
  );

  useEffect(
    function concatAllFeedbacksDataManager() {
      if (allFeedbacksData) {
        console.log("allFeedbacksData: ", allFeedbacksData);
        let feedbackList: FeedbackBest[] = [];

        allFeedbacksData.forEach((feedbacks) => {
          if (feedbacks.status) {
            feedbackList = [...feedbackList, ...feedbacks.payload.data];
          }
        });

        setAllFeedbackList(feedbackList);
      }
    },
    [allFeedbacksData]
  );

  useEffect(
    function canLoadMoreAllFeedbacksManager() {
      if (allFeedbacksData) {
        const lastAllFeedbacksData =
          allFeedbacksData[allFeedbacksData.length - 1];

        setIsCanLoadMoreAllFeedbacks(
          lastAllFeedbacksData.status &&
            lastAllFeedbacksData.payload.next_page_url != null
        );
      } else {
        setIsCanLoadMoreAllFeedbacks(false);
      }
    },
    [allFeedbacksData]
  );

  const handleRouteAddFeedback = () => {
    if (self != null) {
      router.push("/addfeedback");
    } else {
      router.push("/login");
    }
  };

  const handleLoadMoreAllFeedbacks = useCallback(() => {
    if (isCanLoadMoreAllFeedbacks) {
      setSize(size + 1);
    }
  }, [size, isCanLoadMoreAllFeedbacks]);

  const states = {
    self,
    allFeedbackList,
    isCanLoadMoreAllFeedbacks,
  };
  const actions = {
    handleRouteAddFeedback,
    handleLoadMoreAllFeedbacks,
  };

  return { actions, states };
};

export default usePageMainController;
