import { useCallback, useEffect, useState } from "react";

// Import CONTEXTS
import { context } from "context";

// Import API
import { getTracks, deleteTrack } from "api/tracking";

const useTrackAccountsController = (
  initialData: Omit<TrackingResponse, "status">
) => {
  // CONTEXTS
  const { useUserContext } = context;
  const { user: self } = useUserContext();

  // STATES
  const [trackAccountsList, setTrackAccountsList] = useState(initialData.data);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(initialData.current_page);
  const [isCanLoadMore, setIsCanLoadMore] = useState(
    initialData.next_page_url != null
  );

  useEffect(() => {
    console.log("TrackAccount content: ", initialData);
  }, [initialData]);

  useEffect(function setInitialData() {}, [initialData]);

  const loadData = useCallback(() => {
    getTracks(null).then((tracksResponse) => {
      if (tracksResponse.status) {
        setTrackAccountsList(tracksResponse.payload.data);
      }
    });
  }, []);

  const loadMoreBestFeedbacks = useCallback(() => {
    // const nextPageValue = currentPage + 1;
    // setIsLoading(true);
    // getTopUsers(nextPageValue).then((moreTopUsersResponse) => {
    //   console.log("moreTopUsersResponse: ", moreTopUsersResponse);
    //   setIsLoading(false);
    //   if (moreTopUsersResponse.status) {
    //     setCurrentPage(nextPageValue);
    //     setTopUserList((prevState) => [
    //       ...prevState,
    //       ...moreTopUsersResponse.payload.data,
    //     ]);
    //     setIsCanLoadMore(moreTopUsersResponse.payload.next_page_url != null);
    //   }
    // });
  }, [currentPage]);

  const handleOnClose = useCallback(
    (status: boolean) => {
      if (status) {
        loadData();
      }
    },
    [loadData]
  );

  const handleDeleteTrack = useCallback(
    (trackId: number) => {
      deleteTrack(trackId).then((deleteTrackResponse) => {
        if (deleteTrackResponse.status) {
          loadData();
        }
      });
    },
    [loadData]
  );

  const states = { trackAccountsList, isLoading, isCanLoadMore, self };
  const actions = { loadMoreBestFeedbacks, handleOnClose, handleDeleteTrack };

  return { states, actions };
};

export default useTrackAccountsController;
