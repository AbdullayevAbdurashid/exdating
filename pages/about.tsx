import { useEffect } from "react";
import { InferGetStaticPropsType } from "next";

// Import CONTROLLERS
import { context } from "context";

// Import LAYOUTS and CONTAINERS
import { WrapperPage, PageAbout } from "layouts";

// Import MOCK DATA
import commonContentData from "utils/mocks";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export default function About({ footer, header }: Props) {
  return (
    <WrapperPage title="Exdating - About" commonContent={{ footer, header }}>
      <PageAbout />
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
