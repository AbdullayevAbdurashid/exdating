import { createContext, useContext, useState } from "react";

export type UserDefaultState = {
  user: UserSelf | null;
  subscribeList: number[];
  actions: UserActions;
};
export type UserActions = {
  setUserData: (data: UserSelf) => void;
  destroyUserData: () => void;
  checkSelf: (userId: number) => boolean;
  subscribeToUser: (userId: number) => void;
  unsubscribeFromUser: (userId: number) => void;
};

const userDefaultState: UserDefaultState = {
  user: null,
  subscribeList: [],
  actions: {
    setUserData: () => {},
    destroyUserData: () => {},
    subscribeToUser: () => {},
    unsubscribeFromUser: () => {},
    checkSelf: () => false,
  },
};

const userContext = createContext<UserDefaultState>(userDefaultState);

const UserProvider: React.FC = ({ children }) => {
  const menuState = useProvideUserControl();

  return (
    <userContext.Provider value={menuState}>{children}</userContext.Provider>
  );
};

function useProvideUserControl() {
  const [user, setUser] = useState<UserSelf | null>(null);
  const [subscribeList, setSubscribeList] = useState<number[]>([]);

  const actions: UserActions = {
    setUserData: (data) => {
      setUser(data);
    },
    destroyUserData: () => {
      setUser(null);
    },
    checkSelf: (userId: number) => {
      if (user == null) {
        return false;
      }

      if (user.id === userId) {
        return true;
      }

      return false;
    },
    subscribeToUser: (userId: number) => {
      setSubscribeList((prevState) => {
        const newSubscribeList = [...prevState, userId];

        return newSubscribeList;
      });
    },
    unsubscribeFromUser: (userId: number) => {
      setSubscribeList((prevState) => {
        const newSubscribeList = prevState.filter((value) => value !== userId);

        return newSubscribeList;
      });
    },
  };

  return { user, subscribeList, actions };
}

const useUserContext = () => useContext(userContext);

export { useUserContext };
export default UserProvider;
