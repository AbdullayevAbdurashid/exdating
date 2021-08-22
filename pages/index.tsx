import { InferGetServerSidePropsType, GetServerSidePropsContext } from "next";

// Import API
import { getBestFeedbacks, getAllFeedbacks } from "api/feedbacks";
import { getbestComments } from "api/comments";
import { getTopUsers, getSelf } from "api/user";

// Import LAYOUTS and CONTAINERS
import { WrapperPage, PageMain } from "layouts";

// Import MOCK DATA
import commonContentData from "utils/mocks";

export default function MainPage(
  pageContent: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { footer, header, self, ...pageData } = pageContent;

  return (
    <WrapperPage
      commonContent={{ footer, header }}
      self={self}
      title="Exdating - Main page"
    >
      <PageMain data={pageData} />
    </WrapperPage>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const commonContent: CommonContent = commonContentData;

  const bestFeedbacks = await getBestFeedbacks();
  const allFeedbacks = await getAllFeedbacks();
  const bestComments = await getbestComments();
  const topUsers = await getTopUsers(undefined, 10);
  const self = await getSelf(ctx);

  return {
    props: {
      ...commonContent,
      self: self.status ? self.payload.data : null,
      ...{
        topusers: topUsers.status ? topUsers.payload.data : [],
        bestFeedbacks: bestFeedbacks.status ? bestFeedbacks.payload.data : [],
        allFeedbacks,
        commentsBest: bestComments.status ? bestComments.payload.data : [],
      },
    },
  };
}
