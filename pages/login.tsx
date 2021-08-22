import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useEffect } from "react";

// Import API
import { getSelf } from "api/user";

// Import CONTROLLERS
import { context } from "context";

// Import LAYOUTS
import { WrapperPage, PageAuth } from "layouts";

// Import MOCK DATA
import commonContentData from "utils/mocks";

export default function Login({
  verified,
  footer,
  header,
  self,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <WrapperPage
      title="Exdating - Login"
      commonContent={{ footer, header }}
      self={self}
    >
      <PageAuth isSignup={false} verified={verified} />
    </WrapperPage>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const redirectProps = { permanent: false, destination: "/profile" };
  const { query } = ctx;

  const commonContent: CommonContent = commonContentData;
  const self = await getSelf(ctx);

  const response: GetServerSideResponse<
    CommonContent & { verified: boolean; self: null | UserSelf }
  > = {
    props: {
      ...commonContent,
      verified: (query.verified && query.verified === "ok") || false,
      self: self.status ? self.payload.data : null,
    },
  };

  if (self.status) {
    response.redirect = redirectProps;
  }

  return response;
}
