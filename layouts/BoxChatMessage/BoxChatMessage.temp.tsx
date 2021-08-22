import type { TextColor } from "components/Text";

type BurgerItemList = {
  id: "reply" | "select" | "copy";
  text: string;
  icon?: React.ReactNode;
  color: TextColor;
}[];

export const BURGER_ITEM_LIST: BurgerItemList = [
  {
    id: "reply",
    text: "Reply",
    color: "moonlight",
  },
  {
    id: "select",
    text: "Select",
    color: "moonlight",
  },
  {
    id: "copy",
    text: "Copy text",
    color: "moonlight",
  },
];

export default { BURGER_ITEM_LIST };
