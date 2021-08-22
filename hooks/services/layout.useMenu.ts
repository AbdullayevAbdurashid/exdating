import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/router";

// Import CONTEXT
import { context } from "context";

// Import HOOKS
import { commonHooks } from "hooks";

const useMenu = () => {
  const router = useRouter();
  const { useMenuState, useGeneralContext } = context;
  const { isMenuActive, onChangeMenuState } = useMenuState();
  const {
    actions: { changePopupState },
  } = useGeneralContext();

  const [isLanguageMenuActive, setIsLanguageMenuActive] = useState(false);

  const { width } = commonHooks.useDimension();

  useEffect(
    function toggleScrollOnMenuState() {
      if (width && width <= 767) {
        changePopupState(isMenuActive);
      }
    },
    [isMenuActive, width]
  );

  const responsiveMenuClosedPosition = useMemo(() => {
    if (width != null) {
      if (width <= 767) {
        return "-100%";
      }

      return "-106px";
    }

    return "-100%";
  }, [width]);

  const onOpenLangMenu = () => {
    setIsLanguageMenuActive(true);
  };

  const onCloseLangMenu = () => {
    setIsLanguageMenuActive(false);
  };

  const onMenuClose = (state: boolean) => {
    onCloseLangMenu();
    onChangeMenuState(state);
  };

  const onLink = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    link: string
  ) => {
    event.preventDefault();
    onMenuClose(false);
    router.push(link);
  };

  const onSignup = () => {
    onMenuClose(false);
    router.push("/signup");
  };

  const onLangChange = (lang: Language) => {
    setIsLanguageMenuActive(false);
  };

  return {
    isLanguageMenuActive,
    isMenuActive,
    onOpenLangMenu,
    onCloseLangMenu,
    onLink,
    onSignup,
    onLangChange,
    onMenuClose,
    responsiveMenuClosedPosition,
  };
};

export default useMenu;
