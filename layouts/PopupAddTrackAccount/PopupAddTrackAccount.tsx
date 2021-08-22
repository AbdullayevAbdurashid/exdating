// Import CONTROLLERS
import usePopupAddTrackAccountController from "./PopupAddTrackAccount.controller";

// Import COMPONENTS
import { Text } from "components";

// Import LAYOUTS
import {
  FieldsetAbout,
  FieldsetSocial,
  WrapperPopup,
  ButtonGradient,
} from "layouts";

// Import STYLES
import styles from "./PopupAddTrackAccount.module.scss";

type Props = {
  className?: string;
  initialData?: TrackAccount;
  onClose: (status: boolean) => void;
  close: () => void;
};

const PopupAddTrackAccount: React.FC<Props> = ({
  className,
  onClose,
  close,
  initialData,
}) => {
  const classNames = [styles.popupAddTrack, className].join(" ");

  // CONTROLLERS
  const {
    forms: { register, handleSubmit, setValue },
    actions: { onSubmit },
  } = usePopupAddTrackAccountController({ close, onClose, initialData });

  return (
    <WrapperPopup onClose={close} className={classNames}>
      <div className={styles.popupAddTrack__wrapper}>
        <Text color="greyDark" as="h3" className={styles.popupAddTrack__title}>
          Add track account
        </Text>

        <form
          className={styles.popupAddTrack__form}
          onSubmit={handleSubmit(onSubmit)}
        >
          <FieldsetAbout setValue={setValue} register={register} />

          <FieldsetSocial
            className={styles.popupAddTrack__formFieldsetSocial}
            register={register}
          />

          <ButtonGradient
            type="submit"
            className={styles.popupAddTrack__btnSubmit}
          >
            Add account
          </ButtonGradient>
        </form>
      </div>
    </WrapperPopup>
  );
};

export default PopupAddTrackAccount;
