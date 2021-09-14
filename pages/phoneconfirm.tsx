import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

// Import LAYOUTS
import { WrapperPage, PagePhoneConfirmation } from "layouts";
import commonContentData from "utils/mocks";

export default function ForgotPassword({
  phone,
  isRestore,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log(isRestore)
  return (
    <WrapperPage title="Exdating phone confirmation" >
      <PagePhoneConfirmation phone={phone} />
    </WrapperPage>
  );
}
export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { query } = ctx;
  const redirectProps = { permanent: false, destination: "/" };


  return {
    props: {
      isRestore: (query.type && query.type === "recover") || false,
      phone: query.phone || false,
    },
  };
}
