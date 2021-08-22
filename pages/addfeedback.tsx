import { InferGetServerSidePropsType, GetServerSidePropsContext } from "next";

// Import API
import { getSelf } from "api/user";

// Import LAYOUTS and CONTAINERS
import { WrapperPage, PageAddFeedback } from "layouts";

// Import MOCK DATA
import commonContentData from "utils/mocks";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function AddFeedback({ footer, header, self }: Props) {
  return (
    <WrapperPage
      title="Exdating - Add feedback"
      commonContent={{ footer, header }}
      self={self}
    >
      <PageAddFeedback />
    </WrapperPage>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const commonContent: CommonContent = commonContentData;
  const redirectProps = { permanent: false, destination: "/login" };

  const self = await getSelf(ctx);

  return {
    props: {
      ...commonContent,
      self: self.status ? self.payload.data : null,
    },
    redirect: !self.status ? redirectProps : undefined,
  };
}
