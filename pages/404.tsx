import { useEffect } from "react";
import { InferGetStaticPropsType } from "next";

// Import CONTROLLERS
import { context } from "context";

// Import LAYOUTS and CONTAINERS
import { WrapperPage, Page404 } from "layouts";

// Import MOCK DATA
import commonContentData from "utils/mocks";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export default function Forbidden({ footer, header }: Props) {
  return (
    <WrapperPage title="Exdating - Forvidden 404" commonContent={{ footer, header }}>
      <Page404 />
    </WrapperPage>
  );
}

export async function getStaticProps() {
  const commonContent: CommonContent = commonContentData;

  return {
    props: {
      ...commonContent,
    },
  };
}