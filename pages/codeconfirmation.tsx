import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

// Import API
import { getSelf } from "api/user";

// Import LAYOUTS
import { WrapperPage, PageCodeConfirmation } from "layouts";

// Import MOCK DATA
import commonContentData from "utils/mocks";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function ConfirmCode({ footer, header, self, email, code }: Props) {
  if (email == null || typeof email !== "string") {
    return null;
  }

  return (
    <WrapperPage
      title="Exdating - Code confiramtion"
      commonContent={{ footer, header }}
      self={self}
    >
      <PageCodeConfirmation email={email} code={code} />
    </WrapperPage>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const commonContent: CommonContent = commonContentData;
  const redirectProps = { permanent: false, destination: "/login" };
  const { query } = ctx;

  const self = await getSelf(ctx);

  return {
    props: {
      ...commonContent,
      self: self.status ? self.payload.data : null,
      email: query.email,
      code: query.code,
    },
    redirect: !query.email ? redirectProps : undefined,
  };
}
