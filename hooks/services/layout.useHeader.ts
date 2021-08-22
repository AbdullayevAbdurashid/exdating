import { useMemo, useEffect, useState } from "react";
import { useRouter } from "next/router";

// import CONTEXT
import { context } from "context";

// Import UTILS
import { helpers } from "utils";

type MediaQueryDisplayNone = "575";

const useHeader = () => {
  const router = useRouter();

  const { useGeneralContext } = context;
  const {
    isPopupOpen,
    scroll: { barWidth },
    actions: { changePopupState },
  } = useGeneralContext();

  const [isSticky, setIsSticky] = useState<boolean>(false);
  const [
    mediaQueryDisplayNoneState,
    setMediaQueryDisplayNoneState,
  ] = useState<MediaQueryDisplayNone | null>(null);

  useEffect(function checkAndSetScrollState() {
    function handleScroll() {
      setIsSticky(window.scrollY > 0);
    }

    const handleDebounceScroll = helpers.debounce(handleScroll, 300, {
      isImmediate: true,
    });

    setIsSticky(window.scrollY > 0);
    window.addEventListener("scroll", handleDebounceScroll);

    return function cleanEventListener() {
      window.removeEventListener("scroll", handleDebounceScroll);
    };
  }, []);

  useEffect(
    function checkAndSetStatesByRoute() {
      checkAndSetDisplayNoneState();

      function checkAndSetDisplayNoneState() {
        // Setting display none
        if (
          router.route === "/login" ||
          router.route === "/signup" ||
          router.route === "/forgotpassword" ||
          router.route === "/resetpassword" ||
          router.route === "/phoneconfirm"
        ) {
          setMediaQueryDisplayNoneState("575");
        } else {
          setMediaQueryDisplayNoneState(null);
        }
      }
    },
    [router.route]
  );

  const onLoginRoute = () => {
    router.push("/login");
  };

  const onSignupRoute = () => {
    router.push("/signup");
  };

  const onProfileRoute = () => {
    router.push("/profile");
  };

  const theme = useMemo(() => {
    if (
      router.pathname === "/login" ||
      router.pathname === "/signup" ||
      router.pathname === "/resetpassword" ||
      router.pathname === "/phoneconfirm" ||
      router.pathname === "/forgotpassword"
    ) {
      return "secondary";
    }

    return undefined;
  }, [router.pathname]);

  return {
    theme,
    isSticky,
    onLoginRoute,
    onSignupRoute,
    onProfileRoute,
    displayNoneMediaQuery: mediaQueryDisplayNoneState,
    scrollPadding: isPopupOpen ? `${barWidth}px` : "0px",
    changePopupState,
  };
};

export default useHeader;
