import type { TextColor } from "components/Text";

// Import MEDIA
import BasketIcon from "public/icons/icon-basket.svg";
import CloseRoundIcon from "public/icons/icon-round-close.svg";

type BurgerItemList = {
  id: "basked" | "blocked";
  text: string;
  icon: React.ReactNode;
  color: TextColor;
}[];

export const BURGER_ITEM_LIST: BurgerItemList = [
  {
    id: "basked",
    text: "Basket",
    color: "moonlight",
    icon: <BasketIcon width={12} height={13} />,
  },
  {
    id: "blocked",
    text: "Blocked users",
    color: "moonlight",
    icon: <CloseRoundIcon width={12} height={13} />,
  },
];

export default { BURGER_ITEM_LIST };
