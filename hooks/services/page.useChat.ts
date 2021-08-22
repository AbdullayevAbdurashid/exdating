import { useState, useEffect } from "react";
import useSWR from "swr";

const fetcher = (input: RequestInfo, init?: RequestInit) =>
  fetch(input, init).then((res) => res.json());

const useChat = () => {
  const [isLoading, setIsLoadingState] = useState(true);
  const [userChatId, setUserChatId] = useState<string | null>(null);
  const [isBlockedMenuActive, setIsBlockedMenuActive] = useState(false);

  const selectUserChat = (userId: string | null) => {
    setUserChatId(userId);
  };

  // useEffect(
  //   function manageLoadingPhase() {
  //     // console.log("messagesData: ", messagesData);
  //     // console.log("usersData: ", usersData);
  //     if (usersData && messagesData) {
  //       setIsLoadingState(false);
  //     }
  //   },
  //   [usersData, messagesData]
  // );

  return {
    isLoading,
    // users: usersData,
    // messages: messagesData,
    selectUserChat,
    userChatId,
    isBlockedMenuActive,
    setIsBlockedMenuActive,
  };
};

export default useChat;
