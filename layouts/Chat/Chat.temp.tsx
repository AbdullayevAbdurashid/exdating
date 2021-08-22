import type { TextColor } from "components/Text";

// Import MEDIA
import BasketIcon from "public/icons/icon-basket.svg";
import CloseRoundIcon from "public/icons/icon-round-close.svg";
import ClearIcon from "public/icons/icon-clear.svg";
import WarningIcon from "public/icons/icon-warning.svg";

type BurgerItemList = {
  id: "block" | "clear" | "spam" | "delete";
  text: string;
  icon: React.ReactNode;
  color: TextColor;
}[];

export const BURGER_ITEM_LIST: BurgerItemList = [
  {
    id: "block",
    text: "Block user",
    color: "moonlight",
    icon: <CloseRoundIcon width={12} height={13} />,
  },
  {
    id: "clear",
    text: "Clear history",
    color: "moonlight",
    icon: <ClearIcon width={12} height={13} />,
  },
  {
    id: "spam",
    text: "Mark as spam",
    color: "moonlight",
    icon: <WarningIcon width={12} height={13} />,
  },
  {
    id: "delete",
    text: "Delete chat",
    color: "moonlight",
    icon: <BasketIcon width={12} height={13} />,
  },
];

export default BURGER_ITEM_LIST;
