import useMedia from "./common/useMedia";
import useDimension from "./common/useDimension";
import useOutsideClick from "./common/useOutsideClick";
import useInterval from "./common/useInterval";
import useIntersectionObserver from "./common/useIntersectionObserver";
import useSmoothScroll from "./common/useSmoothScroll";
import useFetcher from "./common/useFetcher";

import useResetPasswordHandlers from "./services/page.resetPasswordHandler";
import usePhoneConfirmation from "./services/page.usePhoneConfirmation";
import useChat from "./services/page.useChat";

import useMenu from "./services/layout.useMenu";
import useHeader from "./services/layout.useHeader";
import useFooter from "./services/layout.useFooter";
import useSearch from "./services/layout.useSearch";
import useWrapperPage from "./services/layout.useWrapperPage";
import useUserSubscriptionService from "./services/services.subscription";

// LIBS
import useNotification from "./libs/useNotification";

const commonHooks = {
  useFetcher,
  useMedia,
  useDimension,
  useOutsideClick,
  useInterval,
  useIntersectionObserver,
  useSmoothScroll,
};
const serviceHooks = {
  useResetPasswordHandlers,
  usePhoneConfirmation,
  useChat,
  useMenu,
  useHeader,
  useFooter,
  useSearch,
  useWrapperPage,
  useUserSubscriptionService,
};
const libHooks = { useNotification };

export { commonHooks, serviceHooks, libHooks };
