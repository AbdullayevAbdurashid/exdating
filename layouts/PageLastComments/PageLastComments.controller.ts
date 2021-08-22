import { useCallback, useEffect, useState } from "react";
import { useSWRInfinite } from "swr";

// Import API
import { setBestCommentsURL, TABS } from "api/comments";

// Import UTILS
import { getFetcherSWR } from "utils/fetchers";

const useLastCommentsPageController = (
  initialCommentsData: APIResponseWithData<BestCommentsResponse>
) => {
  // SWR
  const {
    data: lastCommentsData,
    mutate: mutateLastComments,
    setSize,
    size,
  } = useSWRInfinite(
    (index) => [`${setBestCommentsURL(TABS.LAST)}&page=${index + 1}`],
    (src) => getFetcherSWR<BestCommentsResponse>(src),
    { initialData: [initialCommentsData] }
  );

  // STATES
  const [isCanLoadMoreLastComments, setIsCanLoadMoreLastComments] = useState(
    false
  );

  useEffect(() => {
    console.log("lastCommentsData: ", lastCommentsData);
  }, [lastCommentsData]);

  useEffect(
    function checkForLoadMoreLastCommentsManager() {
      if (lastCommentsData != null) {
        const lastCommentsDataInList =
          lastCommentsData[lastCommentsData.length - 1];

        setIsCanLoadMoreLastComments(
          lastCommentsDataInList.status &&
            lastCommentsDataInList.payload.next_page_url != null
        );
      } else {
        setIsCanLoadMoreLastComments(false);
      }
    },
    [lastCommentsData]
  );

  const handleLoadMoreLastComments = useCallback(() => {
    setSize(size + 1);
  }, [size]);

  const actions = { handleLoadMoreLastComments };

  const states = { lastCommentsData, isCanLoadMoreLastComments };

  return { states, actions };
};

export default useLastCommentsPageController;
