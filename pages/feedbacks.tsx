import { InferGetServerSidePropsType, GetServerSidePropsContext } from "next";

// Import API
import { searchGlobal } from "api/search";
import { getSelf } from "api/user";

// Import LAYOUTS and CONTAINERS
import { WrapperPage, PageFeedbacks } from "layouts";

// Import MOCK DATA
import commonContentData from "utils/mocks";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function Feedbacks({ feedbacks, footer, header }: Props) {
  return (
    <WrapperPage
      title="Exdating - Feedbacks"
      fetchLocationsData
      commonContent={{ footer, header }}
    >
      <PageFeedbacks feedbacks={feedbacks} />
    </WrapperPage>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const commonContent: CommonContent = commonContentData;

  const feedbacksAll = await searchGlobal();
  const self = await getSelf(ctx);

  const redirectProps = { permanent: false, destination: "/404" };

  return {
    props: {
      ...commonContent,
      feedbacks: feedbacksAll,
      self: self.status ? self.payload.data : null,
    },
    redirect: !feedbacksAll.status ? redirectProps : undefined,
  };
}
