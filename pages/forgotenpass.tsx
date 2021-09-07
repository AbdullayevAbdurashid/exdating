import React from 'react'
import { WrapperPage, PageResetPassword } from "layouts";
import commonContentData from "utils/mocks";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getSelf } from "api/user";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const Forgotenpass: React.FC<Props> = ({
  verified,
  footer,
  header,
  self
}) => {

  return (
    <div>
      <WrapperPage
        title="Exdating  Password recovery"
        commonContent={{ footer, header }}
        self={self}
      >
        <PageResetPassword isEmailConfirmed={verified} />
      </WrapperPage>
    </div>
  )
}
export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const commonContent: CommonContent = commonContentData;

  const self = await getSelf(ctx);
  const { query } = ctx;
  console.log(query)

  const redirectProps = { permanent: false, destination: "/404" };

  return {
    props: {

      ...commonContent,
      verified: (query.verified && query.verified === "ok") || false,
      self: self.status ? self.payload.data : null,
    },
  };
}


export default Forgotenpass