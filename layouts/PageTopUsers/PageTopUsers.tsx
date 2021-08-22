// Import CONTROLLERS
import useTopUserPageController from "./PageTopUsers.controller";

// Import COMPONENTS
import { Container, Text } from "components";

// Import LAYOUTS
import { ButtonLoadMore, BoxTopUser } from "layouts";

// Import STYLES
import styles from "./PageTopUsers.module.scss";

type Props = {
  className?: string;
  content: APIResponseWithData<TopUserResponse>;
  subscriptions: APIResponseWithData<SubscriptionListResponse>;
};

const PageTopUsers: React.FC<Props> = ({
  className,
  content,
  subscriptions,
}) => {
  const classNames = [styles.topusers, className].join(" ");

  // CONTROLLERS
  const {
    states: { isCanLoadMoreTopUsers, self, topUsersData },
    actions: { handleLoadMoreTopUsers, subscribe, checkIsUserSubscribed },
  } = useTopUserPageController(content, subscriptions);

  return (
    <div className={classNames}>
      <Container className={styles.topusers__container}>
        <Text as="h3" color="primary" center className={styles.topusers__title}>
          Top users
        </Text>

        {topUsersData != null && (
          <ul className={styles.topusers__userList}>
            {topUsersData.map(
              (topUsersList) =>
                topUsersList.status &&
                topUsersList.payload.data.map((topuser, index) => (
                  <li
                    key={topuser.id}
                    className={styles.topusers__userListItem}
                  >
                    <BoxTopUser
                      user={topuser}
                      isSelf={self != null && topuser.id === self.id}
                      stand={index + 1}
                      type="normal"
                      key={topuser.id}
                      onSubscribe={
                        self != null && topuser.id === self.id
                          ? undefined
                          : subscribe
                      }
                      subBtnText={
                        checkIsUserSubscribed(topuser.id)
                          ? "Unsubscribe"
                          : "Subscribe"
                      }
                    />
                  </li>
                ))
            )}
          </ul>
        )}

        {isCanLoadMoreTopUsers && (
          <div className={styles.topusers__more}>
            <ButtonLoadMore
              className={styles.topusers__moreBtn}
              onClick={handleLoadMoreTopUsers}
            />
          </div>
        )}
      </Container>
    </div>
  );
};

export default PageTopUsers;
