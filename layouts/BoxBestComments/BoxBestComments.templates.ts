import { TabsContentProp } from "components/Tabs";
import { TABS } from "api/comments";

const TAB_DATA: TabsContentProp<TABS> = {

  name: "bestComments",
  data: [
    { id: TABS.LAST, name: "Last" },
    { id: TABS.DAY, name: "Day" },
    { id: TABS.WEEK, name: "Week" },
    { id: TABS.MONTH, name: "Month" },
  ],
};

export { TAB_DATA };
export default { TAB_DATA };
