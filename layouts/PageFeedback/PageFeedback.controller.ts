import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import useSWR from "swr";

// Import API
import {
  likeFeedback,
  dislikeFeedback,
  notDecideFeedback,
} from "api/feedbacks";

// Import UTILS
import { fetcher } from "utils";

// Import TYPES
import type { PageData } from "./PageFeedback";

const usePageFeedbackController = (data: PageData) => {
  const {
    feedback: {
      payload: { data: feedbackInitialData },
    },
  } = data;

  // UTILS
  const { getFetcherSWR } = fetcher;

  // FORM
  const { register } = useForm();

  // SWR
  const {
    data: feedbackData,
    mutate,
  } = useSWR(
    `/feedback/${feedbackInitialData.id}`,
    (url) => getFetcherSWR<FeedbackResponse>(url),
    { initialData: data.feedback }
  );

  // ROUTER
  const router = useRouter();

  // STATES
  const [isMore, setIsMore] = useState(false);

  useEffect(() => {
    console.log("feedbackData: ", feedbackData);
  }, [feedbackData]);

  useEffect(() => {
    if (
      feedbackData &&
      feedbackData.status &&
      feedbackData.payload.data.description.length < 1000
    ) {
      setIsMore(true);
    }
  }, [feedbackData]);

  const handleShowOriginal = useCallback(() => {
    console.log("handleShowOriginal");
    console.log("feedback data: ", data);
  }, [data]);

  const showMoreFeedbackDescription = useCallback(() => {
    setIsMore(true);
  }, []);

  const handleLikeFeedback = useCallback(() => {
    if (feedbackData && feedbackData.status)
      likeFeedback(feedbackData.payload.data.id).then((likeResponse) => {
        // console.log("likeResponse: ", likeResponse);
        if (likeResponse.status) {
          // MANUAL MUTATE - not enought api
          // mutate(
          //   {
          //     ...feedbackData,
          //     payload: {
          //       data: {
          //         ...feedbackData.payload.data,
          //         like: likeResponse.payload.like,
          //         likes_count:
          //           feedbackData.payload.data.likes_count +
          //           (likeResponse.payload.like ? 1 : -1),
          //       },
          //     },
          //   },
          //   false
          // );
          mutate();
        }
      });
  }, [feedbackData]);

  const handleDislikeFeedback = useCallback(() => {
    if (feedbackData && feedbackData.status) {
      dislikeFeedback(feedbackData.payload.data.id).then((dislikeResponse) => {
        // console.log("dislikeResponse: ", dislikeResponse);
        if (dislikeResponse.status) {
          mutate();
        }
      });
    }
  }, [feedbackData]);

  const handleNotDecideFeedback = useCallback(() => {
    if (feedbackData && feedbackData.status) {
      notDecideFeedback(feedbackData.payload.data.id).then(
        (notDecideResponse) => {
          // console.log("notDecideResponse: ", notDecideResponse);
          if (notDecideResponse.status) {
            mutate();
          }
        }
      );
    }
  }, [feedbackData]);

  const handleGoToChat = useCallback(() => {
    router.push("/chat");
  }, [router]);

  const actions = {
    showMoreFeedbackDescription,
    handleLikeFeedback,
    handleDislikeFeedback,
    handleNotDecideFeedback,
    handleGoToChat,
    handleShowOriginal,
  };
  const states = {
    isMore,
    feedback:
      feedbackData && feedbackData.status ? feedbackData.payload.data : null,
  };
  const form = { register };

  return { states, form, actions };
};

export default usePageFeedbackController;
