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

export default function Signup({
  footer,
  header,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <WrapperPage title="Exdating - Signup" commonContent={{ footer, header }}>
      <PageAuth isSignup />
    </WrapperPage>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const redirectProps = { permanent: false, destination: "/" };

  const commonContent: CommonContent = commonContentData;
  const self = await getSelf(ctx);

  const response: GetServerSideResponse<CommonContent> = {
    props: {
      ...commonContent,
    },
  };

  if (self.status) {
    response.redirect = redirectProps;
  }

  return response;
}
