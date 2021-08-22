import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

// Import API
import { getSelf } from "api/user";

// Import LAYOUTS
import { WrapperPage, PageResetPassword } from "layouts";

// Import MOCK DATA
import commonContentData from "utils/mocks";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function ForgotPassword({ footer, header,self }: Props) {
  return (
    <WrapperPage
      title="Exdating - Password recovery"
      commonContent={{ footer, header }}
     self={self}
    >
      <PageResetPassword />
    </WrapperPage>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const commonContent: CommonContent = commonContentData;
  const redirectProps = { permanent: false, destination: "/forgotpassword" };

  const self = await getSelf(ctx);

  return {
    props: {
      ...commonContent, 
      self: self.status ? self.payload.data : null,
    },
    redirect: !self.status ? redirectProps : undefined,
  };
}
