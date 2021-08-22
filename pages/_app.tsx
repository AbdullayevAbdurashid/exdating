import type { AppProps /* , AppContext */ } from "next/app";
import ReactNotification from "react-notifications-component";

// Import COMPONENTS
import { Flexbox } from "components";

// Import PROVIDERS
import { Provider } from "context";

// Import STYLES
import "../styles/globals.scss";
import "../styles/libs/slick.scss";
import "../styles/libs/slick-theme.scss";
import "react-notifications-component/dist/scss/notification.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Flexbox className="main" wrap="nowrap" direction="column">
      <Provider>
        <Component {...pageProps} />

        <ReactNotification />
      </Provider>
    </Flexbox>
  );
}

export default MyApp;
