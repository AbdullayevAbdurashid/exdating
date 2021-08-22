import { useEffect } from "react";
import { InferGetStaticPropsType } from "next";

// Import CONTROLLERS
import { context } from "context";

// Import LAYOUTS and CONTAINERS
import { WrapperPage, PageNotAvailable } from "layouts";

// Import MOCK DATA
import commonContentData from "utils/mocks";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export default function NotAvailable({ footer, header }: Props) {
  return (
    <WrapperPage
      title="Exdating - Not available"
      commonContent={{ footer, header }}
    >
      <PageNotAvailable />
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
