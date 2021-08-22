import { useEffect } from "react";
import { InferGetServerSidePropsType, GetServerSidePropsContext } from "next";

// Import API
import { getSelf } from "api/user";

// Import CONTROLLERS
import { context } from "context";

// Import LAYOUTS and CONTAINERS
import { WrapperPage, PageProfile } from "layouts";

// Import MOCK DATA
import commonContentData from "utils/mocks";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function MyProfile({ footer, header, self }: Props) {
  if (self == null) {
    return null;
  }

  return (
    <WrapperPage
      title="Exdating - User Profile"
      commonContent={{ footer, header }}
      self={self}
    >
      <PageProfile userData={self} isMyProfile />
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
      self: !self.status ? null : self.payload.data,
    },
    redirect: !self.status ? redirectProps : undefined,
  };
}
