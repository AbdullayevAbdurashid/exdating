import { useEffect } from "react";
import { InferGetStaticPropsType } from "next";

// Import CONTROLLERS
import { context } from "context";

// Import LAYOUTS and CONTAINERS
import { WrapperPage, PageChat } from "layouts";

// Import MOCK DATA
import commonContentData, { users, chat } from "utils/mocks";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export default function Chat({
  footer,
  header,
  usersData,
  messagesData,
}: Props) {
  return (
    <WrapperPage title="Exdating - Chat" commonContent={{ footer, header }}>
      <PageChat users={usersData} messages={messagesData} />
    </WrapperPage>
  );
}

export async function getStaticProps() {
  const commonContent: CommonContent = commonContentData;

  // TODO Remove in production

  const usersData: UserCommon[] = users;
  const messagesData: ChatMock[] = chat;

  return {
    props: {
      ...commonContent,
      usersData,
      messagesData,
    },
  };
}
