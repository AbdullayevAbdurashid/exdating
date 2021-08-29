import type { AppProps /* , AppContext */ } from "next/app";
import ReactNotification from "react-notifications-component";
// Import COMPONENTS
import { Flexbox } from "components";

//iMPORT MULTILANGUAGE
//import  '../hooks/translation/i18n.jsx'  


// Import PROVIDERS
import { Provider } from "context";

// Import SYLES
import "../styles/globals.scss";
import "../styles/libs/slick.scss";
import "../styles/libs/slick-theme.scss";
import "react-notifications-component/dist/scss/notification.scss";
import React from "react";

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
