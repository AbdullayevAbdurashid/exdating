import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

// Import API
import { getSelf } from "api/user";

// Import LAYOUTS and CONTAINERS
import { WrapperPage, PageProfileEdit } from "layouts";

// Import MOCK DATA
import commonContentData from "utils/mocks";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function EditProfile({ footer, header, self }: Props) {
  if (self == null) {
    return null;
  }

  return (
    <WrapperPage
      title="Exdating - Edit profile"
      fetchLocationsData
      commonContent={{ header, footer }}
      self={self}
    >
      <PageProfileEdit />
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
