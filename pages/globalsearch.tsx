import { InferGetServerSidePropsType, GetServerSidePropsContext } from "next";

// Import API
import { searchGlobal } from "api/search";
import { getSelf } from "api/user";

// Import LAYOUTS and CONTAINERS
import { WrapperPage, PageGlobalSearch } from "layouts";

// Import MOCK DATA
import commonContentData from "utils/mocks";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function GlobalSearch({
  feedbacks,
  footer,
  header,
  self,
}: Props) {
  return (
    <WrapperPage
      title="Exdating - Global Search"
      fetchLocationsData
      commonContent={{ footer, header }}
      self={self}
    >
      <PageGlobalSearch feedbacks={feedbacks} />
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
