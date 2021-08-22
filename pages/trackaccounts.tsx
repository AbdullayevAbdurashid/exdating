import { InferGetServerSidePropsType, GetServerSidePropsContext } from "next";

// Import API
import { getTracks } from "api/tracking";
import { getSelf } from "api/user";

// Import LAYOUTS and CONTAINERS
import { WrapperPage, PageTrackAccounts } from "layouts";

// Import MOCK DATA
import commonContentData from "utils/mocks";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function TrackAccounts(pageContent: Props) {
  const { footer, header, self, trackaccounts } = pageContent;

  return (
    <WrapperPage
      title="Exdating - Track accounts"
      commonContent={{ footer, header }}
      self={self}
    >
      {trackaccounts != null && <PageTrackAccounts content={trackaccounts} />}
    </WrapperPage>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const commonContent: CommonContent = commonContentData;

  const trackList = await getTracks(ctx);
  const self = await getSelf(ctx);

  const redirectProps = { permanent: false, destination: "/404" };

  return {
    props: {
      ...commonContent,
      trackaccounts: trackList.status ? trackList.payload : null,
      self: self.status ? self.payload.data : null,
    },
    redirect: !trackList.status ? redirectProps : undefined,
  };
}
