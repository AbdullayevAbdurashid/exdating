import { createContext, useContext, useState } from "react";

export type DefaultState = {
  isMenuActive: boolean;
  onChangeMenuState: (state: boolean) => void;
};

const defaultState: DefaultState = {
  isMenuActive: false,
  onChangeMenuState: () => {},
};

const menuContext = createContext<DefaultState>(defaultState);

const MenuProvider: React.FC = ({ children }) => {
  const menuState = useProvideMenuControl();

  return (
    <menuContext.Provider value={menuState}>{children}</menuContext.Provider>
  );
};

function useProvideMenuControl() {
  const [isMenuActive, setIsMenuActive] = useState<boolean>(false);

  const onChangeMenuState = (newState: boolean): void => {
    setIsMenuActive(newState);
  };

  return { isMenuActive, onChangeMenuState };
}

const useMenuState = () => useContext(menuContext);

export { MenuProvider, useMenuState };
