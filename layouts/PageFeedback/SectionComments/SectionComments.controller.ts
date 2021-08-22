import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";

// Import UTILS
import { fetcher } from "utils";

// Import API
import { setFeedbackComment } from "api/comments";

const useSectionCommentsController = (
  feedbackId: number,
  comments: EComment[]
) => {
  // FORM
  const { register, handleSubmit, reset } = useForm();

  // UTILS
  const { getFetcherSWR } = fetcher;

  // SWR
  const {
    data: commentsData,
    mutate,
  } = useSWR(`/comments?feedbackId=${feedbackId}`, (url) =>
    getFetcherSWR<FeedbackCommentsResponse>(url)
  );

  // STATES
  const [commentsList, setCommentsList] = useState<EComment[]>(comments);
  const [isCanLoadMore, setIsCanLoadMore] = useState(false);

  useEffect(() => {
    if (commentsData && commentsData.status) {
      setIsCanLoadMore(commentsData.payload.next_page_url != null);
      setCommentsList(commentsData.payload.data);
    }
  }, [commentsData]);

  // useEffect(
  //   function setInitialCommentList() {
  //     setCommentsState(comments);
  //   },
  //   [comments]
  // );

  const handleSendComment = (data: FeedbackCommentForm) => {
    setFeedbackComment({ text: data.message, feedback_id: feedbackId }).then(
      (commentResponse) => {
        console.log("commentResponse: ", commentResponse);
        if (commentResponse.status) {
          reset();
          mutate();
        }
      }
    );
  };

  const states = { commentsList, isCanLoadMore };
  const actions = { handleSendComment };
  const form = { register, handleSubmit };

  return { form, actions, states };
};

export default useSectionCommentsController;
