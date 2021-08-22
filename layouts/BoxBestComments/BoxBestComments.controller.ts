import { useCallback, useState, useEffect } from "react";

// Import API
import { TABS, getbestComments } from "api/comments";

export type BestCommentsData = [
  { name: TABS.LAST; comments: ECommentBase[] },
  { name: TABS.DAY; comments: ECommentBase[] },
  { name: TABS.WEEK; comments: ECommentBase[] },
  { name: TABS.MONTH; comments: ECommentBase[] }
];

const useBestCommentsController = (
  lastComments: ECommentBase[],
  maxCommentListLength: number
) => {
  const [dayComments, setDayComments] = useState<ECommentBase[]>([]);
  const [weekComments, setWeekComments] = useState<ECommentBase[]>([]);
  const [monthComments, setMonthComments] = useState<ECommentBase[]>([]);
  const [bestCommentsTabs, setBestComments] = useState<BestCommentsData>([
    { name: TABS.LAST, comments: lastComments },
    { name: TABS.DAY, comments: [] },
    { name: TABS.WEEK, comments: [] },
    { name: TABS.MONTH, comments: [] },
  ]);
  const [tabType, setTabType] = useState<TABS>(TABS.LAST);
  const [isFetching, setIsFetching] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(
    function startFetchingWhenTabIsChanged() {
      if (!isInitialLoad) {
        setIsFetching(true);
      }
    },
    [tabType, isInitialLoad]
  );

  useEffect(
    function fetchTabData() {
      function fetchBestCommentData(type: TABS) {
        switch (type) {
          case TABS.DAY:
            return { status: dayComments.length === 0, setter: setDayComments };
          case TABS.WEEK:
            return {
              status: weekComments.length === 0,
              setter: setWeekComments,
            };
          case TABS.MONTH:
            return {
              status: monthComments.length === 0,
              setter: setMonthComments,
            };
          default:
            return {
              status: lastComments.length === 0,
              setter: setDayComments,
            };
        }
      }

      const { setter, status } = fetchBestCommentData(tabType);

      if (status && isFetching) {
        getbestComments(tabType, maxCommentListLength).then(
          (bestDayCommentsResponse) => {
            setIsFetching(false);

            if (bestDayCommentsResponse.status) {
              setter(bestDayCommentsResponse.payload.data);
            } else {
              setter([]);
            }
          }
        );
      }
    },
    [tabType, dayComments, isFetching, maxCommentListLength, lastComments]
  );

  useEffect(() => {
    setBestComments([
      { name: TABS.LAST, comments: lastComments },
      { name: TABS.DAY, comments: dayComments },
      { name: TABS.WEEK, comments: weekComments },
      { name: TABS.MONTH, comments: monthComments },
    ]);
  }, [dayComments, weekComments, monthComments, lastComments]);

  const changeTab = useCallback(
    (newTab: TABS) => {
      if (tabType !== newTab) {
        setIsInitialLoad(false);
        setTabType(newTab);
      }
    },
    [tabType]
  );

  const actions = { changeTab };
  const states = { bestCommentsTabs, tabType, isFetching };

  return { states, actions };
};

export default useBestCommentsController;
