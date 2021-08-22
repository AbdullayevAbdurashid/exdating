import { useEffect } from "react";
import { InferGetStaticPropsType } from "next";

// Import CONTROLLERS
import { context } from "context";

// Import LAYOUTS and CONTAINERS
import { PageContacts, WrapperPage } from "layouts";

// Import MOCK DATA
import commonContentData from "utils/mocks";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export default function ContactsPage({ footer, header }: Props) {
  return (
    <WrapperPage
      title="Exdating - PageContacts"
      commonContent={{ footer, header }}
    >
      <PageContacts />
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
