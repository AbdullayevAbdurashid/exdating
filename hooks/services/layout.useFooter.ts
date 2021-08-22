import { useRouter } from "next/router";
import { useState, useEffect } from "react";

type MediaQueryDisplayNone = "575";

const useFooter = () => {
  const { route } = useRouter();

  const [isActive, setIsActive] = useState<boolean>(true);
  const [isAlternativeColor, setIsAlternativeColor] = useState<boolean>(false);
  const [
    mediaQueryDisplayNoneState,
    setMediaQueryDisplayNoneState,
  ] = useState<MediaQueryDisplayNone | null>(null);

  useEffect(
    function checkAndSetStatesByRoute() {
      checkAndSetAlternativeBackgroundColor();
      checkAndSetHideState();
      checkAndSetDisplayNoneState();

      function checkAndSetHideState() {
        // Hide footer on route
        if (
          route === "/editprofile" ||
          route === "/feedbacks" ||
          route === "/chat"
        ) {
          setIsActive(false);
        } else {
          setIsActive(true);
        }
      }

      function checkAndSetAlternativeBackgroundColor() {
        // Alternative footer background color
        if (route === "/topusers" || route === "/lastcomments") {
          setIsAlternativeColor(true);
        } else {
          setIsAlternativeColor(false);
        }
      }

      function checkAndSetDisplayNoneState() {
        // Setting display none
        if (
          route === "/login" ||
          route === "/signup" ||
          route === "/forgotpassword" ||
          route === "/resetpassword" ||
          route === "/phoneconfirm"
        ) {
          setMediaQueryDisplayNoneState("575");
        } else {
          setMediaQueryDisplayNoneState(null);
        }
      }
    },
    [route]
  );

  return {
    isActive,
    isAlternativeColor,
    displayNoneMediaQuery: mediaQueryDisplayNoneState,
  };
};

export default useFooter;
