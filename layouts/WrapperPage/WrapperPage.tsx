import Head from "next/head";

// Import HOOKS
import { serviceHooks } from "hooks";

// Import LAYOUTS
import { Footer, Header, Menu } from "layouts";
import { useEffect } from "react";

type Props = {
  title: string;
  self?: UserSelf | null;
  fetchLocationsData?: boolean;
  commonContent?: {
    footer: FooterContent;
    header: HeaderContent;
  };
};

const WrapperPage: React.FC<Props> = ({
  children,
  title,
  self,
  fetchLocationsData,
  commonContent,
}) => {
  const { useWrapperPage } = serviceHooks;

  if (typeof window !== "undefined") {
    useWrapperPage(self, fetchLocationsData);
  }

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <>
        <Header self={self} content={commonContent?.header} />
        <Menu content={commonContent?.header} />
      </>

      <div className="content">
        {children}

        <Footer content={commonContent?.footer} />
      </div>
    </>
  );
};

export default WrapperPage;
