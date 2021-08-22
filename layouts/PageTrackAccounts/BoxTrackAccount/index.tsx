import { useCallback } from "react";

// Import COMPONENTS
import {
  BoxSimpleRounded,
  Button,
  IconSocial,
  SLink,
  Text,
  PopupSimple,
} from "components";

// Import LAYOUTS
import { PopupAddTrackAccount } from "layouts";

// Import MEDIA
import CloseIcon from "public/icons/icon-close.svg";
import LocationIcon from "public/icons/icon-nav-pointer.svg";

// Import STYLES
import styles from "./BoxTrackAccount.module.scss";

type Props = {
  className?: string;
  data: TrackAccount;
  trackIndex: string;
  onDelete: (trackId: number) => void;
};

const BoxTrackAccount: React.FC<Props> = ({
  className,
  data,
  trackIndex,
  onDelete,
}) => {
  const classNames = [styles.trackBox, className].join(" ");
  const { id } = data;

  const handleDelete = useCallback(() => {
    onDelete(id);
  }, [id]);

  const handleOnClose = useCallback(() => {
    console.log("handleOnClose");
  }, []);

  return (
    <BoxSimpleRounded className={classNames}>
      <Button
        onClick={handleDelete}
        theme="transparent"
        className={styles.trackBox__btnClose}
      >
        <CloseIcon width={13} height={13} />
      </Button>

      <div className={styles.trackBox__main}>
        <div className={styles.trackBox__trackIndex}>
          <Text className={styles.trackBox__trackIndexText}>{trackIndex}</Text>
        </div>

        <Text
          className={styles.trackBox__name}
          as="h6"
          fontWeight="semibold"
          color="greyDark"
        >
          <span>{data.nickname}</span>
        </Text>

        <div className={styles.trackBox__location}>
          <LocationIcon width={12} height={12} />

          <Text
            className={styles.trackBox__locationText}
            color="moonlight"
            size="sm"
          >
            <span>NO API, </span>
            <span>NO API</span>
          </Text>
        </div>

        {/* <ul className={styles.trackBox__socials}>
          {data.socialLinks.map((social) => (
            <li key={social.name} className={styles.trackBox__socialsItem}>
              <SLink href={social.linkTo}>
                <IconSocial coloredIcons size={"smd"} social={social.name} />
              </SLink>
            </li>
          ))}
        </ul> */}
      </div>

      <PopupSimple
        trigger={
          <Button
            className={styles.trackBox__btnEdit}
            theme="borderedSecondaty"
          >
            <Text
              className={styles.trackBox__btnEditText}
              fontWeight="semibold"
              size="sm"
              color="orange"
            >
              Edit
            </Text>
          </Button>
        }
        modal
      >
        {(close) => (
          <PopupAddTrackAccount
            initialData={data}
            onClose={handleOnClose}
            close={close}
          />
        )}
      </PopupSimple>
    </BoxSimpleRounded>
  );
};

export default BoxTrackAccount;
