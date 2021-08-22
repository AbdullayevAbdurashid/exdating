import { MenuProvider, useMenuState } from "./menu.context";
import { GeneralProvider, useGeneralContext } from "./general.context";
import UserProvider, { useUserContext } from "./user.context";

const Provider: React.FC = ({ children }) => (
  <GeneralProvider>
    <UserProvider>
      <MenuProvider>{children}</MenuProvider>
    </UserProvider>
  </GeneralProvider>
);

const context = {
  useMenuState,
  useGeneralContext,
  useUserContext,
};

export { Provider, context };
