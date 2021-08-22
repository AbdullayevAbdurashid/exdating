import { useEffect, useRef } from "react";

type Callback = (result: Array<IntersectionObserverEntry | null>) => void;

const useIntersectionObserver = (
  refs: React.RefObject<Element>[],
  options: IntersectionObserverInit | null,
  cb: Callback
) => {
  const observerStatusList = useRef<Array<IntersectionObserverEntry | null>>(
    refs.map(() => null)
  );

  useEffect(
    function setupObserver() {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry, entryIndex) => {
            observerStatusList.current.forEach((observerStatus, index) => {
              if (observerStatus == null) {
                observerStatusList.current[entryIndex] = entry;
              } else {
                if (entry.target.contains(observerStatus.target)) {
                  observerStatusList.current[index] = entry;
                }
              }
            });
          });

          cb(observerStatusList.current);
        },
        options == null ? undefined : options
      );

      refs.forEach((ref) => {
        if (ref.current != null) {
          observer.observe.call(observer, ref.current);
        }
      });

      return () => {
        observer.disconnect();
      };
    },
    [refs, options]
  );
};

export default useIntersectionObserver;
