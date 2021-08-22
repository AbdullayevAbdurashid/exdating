import { useEffect, useState } from "react";

// Import API
import { getNotifications } from "api/notifications";

const useHeaderController = () => {
  const [notificationList, setNotificationList] = useState<[]>([]);

  useEffect(function fetchNotifications() {
    getNotifications(null).then((notificationsResponse) => {
      // console.log("notificationsResponse: ", notificationsResponse);

      if (notificationsResponse.status) {
        setNotificationList(notificationsResponse.payload.data);
      }
    });
  }, []);

  const states = {
    notificationList,
  };

  return { states };
};

export default useHeaderController;
