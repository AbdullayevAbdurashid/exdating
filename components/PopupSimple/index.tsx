import { useRef } from "react";
import Popup from "reactjs-popup";

// Import CONTEXT
import { context } from "context";

type Trigger = JSX.Element | ((isOpen: boolean) => JSX.Element);

type EventType = "hover" | "click" | "focus" | "right-click";
type PopupPosition =
  | "top left"
  | "top center"
  | "top right"
  | "right top"
  | "right center"
  | "right bottom"
  | "bottom left"
  | "bottom center"
  | "bottom right"
  | "left top"
  | "left center"
  | "left bottom"
  | "center center";
interface PopupProps {
  trigger?: Trigger;
  open?: boolean;
  disabled?: boolean;
  nested?: boolean;
  defaultOpen?: boolean;
  on?: EventType | EventType[];
  children: React.ReactNode;
  position?: PopupPosition | PopupPosition[];
  offsetX?: number;
  offsetY?: number;
  arrow?: boolean;
  modal?: boolean;
  lockScroll?: boolean;
  closeOnDocumentClick?: boolean;
  closeOnEscape?: boolean;
  repositionOnResize?: boolean;
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
  onOpen?: () => any;
  onClose?: () => any;
  contentStyle?: React.CSSProperties;
  overlayStyle?: React.CSSProperties;
  arrowStyle?: React.CSSProperties;
  className?: string;
  keepTooltipInside?: boolean | string;
}

type Props = { children: (close: () => void) => React.ReactNode } & PopupProps;
type PopupActions = {
  open: () => void;
  close: () => void;
  toggle: () => void;
};

const PopupSimple: React.FC<Props> = ({
  children,
  onClose,
  onOpen,
  ...popupProps
}) => {
  const popupRef = useRef<PopupActions>(null);

  const { useGeneralContext } = context;
  const {
    actions: { changePopupState },
  } = useGeneralContext();

  function getScrollbarWidth() {
    if (document) {
      // Creating invisible container
      const outer = document.createElement("div");
      outer.style.visibility = "hidden";
      outer.style.height = "0px";
      outer.style.overflow = "scroll"; // forcing scrollbar to appear

      // Creating inner element and placing it in the container
      const inner = document.createElement("div");
      inner.style.height = "1px";
      outer.appendChild(inner);

      document.body.appendChild(outer);

      // Calculating difference between container's full width and the child width
      const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

      // Removing temporary elements from the DOM
      outer.parentNode!.removeChild(outer);

      return scrollbarWidth;
    }

    return 0;
  }

  const closePopup = () => {
    popupRef.current!.close();

    if (onClose) {
      onClose();
    }
  };

  const handleClosePopup = () => {
    changePopupState(false);

    if (onClose) {
      onClose();
    }
  };
  const handleOpenPopup = () => {
    changePopupState(true);

    if (onOpen) {
      onOpen();
    }
  };

  return (
    <Popup
      onClose={handleClosePopup}
      onOpen={handleOpenPopup}
      ref={popupRef}
      {...popupProps}
    >
      {children(closePopup)}
    </Popup>
  );
};

export default PopupSimple;
