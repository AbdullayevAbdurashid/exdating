import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

// Import API
import { getFeedback, getBestFeedbacks } from "api/feedbacks";
import { getbestComments } from "api/comments";
import { getTopUsers, getSelf, getSelfSubscriptions } from "api/user";

// Import LAYOUTS
import { WrapperPage, PageFeedback } from "layouts";

// Import MOCK DATA
import commonContentData from "utils/mocks";

export default function Feedback({
  pageContent,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { footer, header, ...pageData } = pageContent;

  if (
    pageData.feedback.status === false ||
    pageData.bestFeedbacks == null ||
    pageData.bestComments == null ||
    pageData.topUsers == null
  ) {
    return null;
  }

  const {
    bestFeedbacks,
    bestComments,
    feedback,
    topUsers,
    self,
    selfSubscriptions,
  } = pageData;

  return (
    <WrapperPage
      title="Exdating - Feedback"
      commonContent={{ footer, header }}
      self={self}
    >
      <PageFeedback
        self={self}
        data={{
          bestFeedbacks,
          bestComments,
          feedback,
          topUsers,
          selfSubscriptions,
        }}
      />
    </WrapperPage>
  );
}

export async function getServerSideProps(
  ctx: GetServerSidePropsContext<{ id: string }>
) {
  const commonContent: CommonContent = commonContentData;

  // REAL API
  const self = await getSelf(ctx);
  const selfSubscriptions = self.status
    ? await getSelfSubscriptions(ctx)
    : null;
  const feedback = await getFeedback(ctx.params!.id, ctx);
  const bestFeedbacks = await getBestFeedbacks();
  const bestComments = await getbestComments();
  const topUsers = await getTopUsers(undefined, 10);

  const redirectProps = { permanent: false, destination: "/login" };

  return {
    props: {
      pageContent: {
        ...commonContent,
        self: self.status ? self.payload.data : null,
        selfSubscriptions,
        feedback,
        topUsers: topUsers.status ? topUsers.payload.data : null,
        bestComments: bestComments.status ? bestComments.payload.data : null,
        bestFeedbacks: bestFeedbacks.status ? bestFeedbacks.payload.data : null,
      },
    },
    redirect: !feedback.status ? redirectProps : undefined,
  };
}
