import { InferGetServerSidePropsType, GetServerSidePropsContext } from "next";

// Import API
import { getBestFeedbacks } from "api/feedbacks";
import { getbestComments, TABS } from "api/comments";
import { getSelf } from "api/user";

// Import CONTROLLERS
import { context } from "context";

// Import LAYOUTS and CONTAINERS
import { WrapperPage, PageLastComments } from "layouts";

// Import MOCK DATA
import commonContentData from "utils/mocks";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function LastComments(pageContent: Props) {
  const { footer, header, bestFeedbacks, comments, self } = pageContent;

  if (comments == null) {
    return null;
  }

  return (
    <WrapperPage
      title="Exdating - Last comments"
      commonContent={{ footer, header }}
      self={self}
    >
      <PageLastComments data={{ comments, bestFeedbacks }} />
    </WrapperPage>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const commonContent: CommonContent = commonContentData;

  const lastComments = await getbestComments(TABS.LAST);
  const bestFeedbacks = await getBestFeedbacks();
  const self = await getSelf(ctx);

  // TODO add 4xx error page
  const redirectProps = { permanent: false, destination: "/404" };

  return {
    props: {
      ...commonContent,
      comments: lastComments,
      bestFeedbacks: bestFeedbacks.status ? bestFeedbacks.payload.data : [],
      self: self.status ? self.payload.data : null,
    },
    redirect: !lastComments.status ? redirectProps : undefined,
  };
}
