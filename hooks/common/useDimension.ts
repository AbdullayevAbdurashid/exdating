import { useEffect, useState } from "react";

// Import UTILS
import { helpers } from "utils";

export type WindowDimension = {
  width: null | number;
  height: null | number;
};

function useDimension() {
  const { debounce } = helpers;
  const [windowSize, setWindowSize] = useState<WindowDimension>({
    width: null,
    height: null,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    const handleResizeDebounced = debounce(handleResize, 100);

    // Add event listener
    window.addEventListener("resize", handleResizeDebounced);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResizeDebounced);
  }, []);

  return windowSize;
}

export default useDimension;
