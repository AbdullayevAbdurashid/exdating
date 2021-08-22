import { InferGetServerSidePropsType, GetServerSidePropsContext } from "next";

// Import API
import { getTopUsers, getSelfSubscriptions, getSelf } from "api/user";

// Import LAYOUTS and CONTAINERS
import { WrapperPage, PageTopUsers } from "layouts";

// Import MOCK DATA
import commonContentData from "utils/mocks";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function TopUsers(pageContent: Props) {
  const { footer, header, topUsers, subscriptions, self } = pageContent;

  return (
    <WrapperPage
      title="Exdating - Top users"
      commonContent={{ footer, header }}
      self={self}
    >
      {topUsers != null && (
        <PageTopUsers content={topUsers} subscriptions={subscriptions} />
      )}
    </WrapperPage>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const commonContent: CommonContent = commonContentData;

  const topUsers = await getTopUsers();
  const subscriptions = await getSelfSubscriptions(ctx, { size: 9999 });
  const self = await getSelf(ctx);

  const redirectProps = { permanent: false, destination: "/404" };

  return {
    props: {
      ...commonContent,
      topUsers,
      subscriptions,
      self: self.status ? self.payload.data : null,
    },
    redirect: !topUsers.status ? redirectProps : undefined,
  };
}
