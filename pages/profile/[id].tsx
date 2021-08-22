import { InferGetServerSidePropsType, GetServerSidePropsContext } from "next";

// Import API
import { getUser, getSelf, getSelfSubscriptions } from "api/user";

// Import UTILS
import { helpers } from "utils";

// Import LAYOUTS and CONTAINERS
import { WrapperPage, PageProfile } from "layouts";

// Import MOCK DATA
import commonContentData from "utils/mocks";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function Profile({
  footer,
  header,
  self,
  user,
  selfSubscriptions,
}: Props) {
  const { formatUserNames } = helpers;

  if (user == null) {
    return null;
  }

  return (
    <WrapperPage
      title={`Exdating - ${formatUserNames(
        user.first_name,
        user.last_name
      )} Profile`}
      commonContent={{ footer, header }}
      self={self}
    >
      <PageProfile userData={user} selfSubscriptions={selfSubscriptions} />
    </WrapperPage>
  );
}

export async function getServerSideProps(
  ctx: GetServerSidePropsContext<{ id: string }>
) {
  const commonContent: CommonContent = commonContentData;
  const redirectProps = { permanent: false, destination: "/404" };

  const userResponse = await getUser(ctx.params!.id);
  const self = await getSelf(ctx);
  const selfSubscriptions = await getSelfSubscriptions(ctx);

  return {
    props: {
      ...commonContent,
      user: userResponse.status ? userResponse.payload.data : null,
      self: self.status ? self.payload.data : null,
      selfSubscriptions,
    },
    redirect: !userResponse.status ? redirectProps : undefined,
  };
}
