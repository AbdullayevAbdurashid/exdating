// Import COMPONENTS
import {
  Checkbox,
  Input,
  InputSelect,
  Text,
  Textarea,
  Button,
} from "components";

// Import LAYOUTS
import { WrapperPopup } from "layouts";

// Import STYLES
import styles from "./PopupSupport.module.scss";

type Props = {
  className?: string;
  style?: React.CSSProperties;
  onClose: () => void;
};

const PopupSupport: React.FC<Props> = ({ className, style, onClose }) => {
  const classNames = [styles.support, className].join(" ");

  return (
    <WrapperPopup onClose={onClose} style={style} className={classNames}>
      <div className={styles.support__wrapper}>
        <Text className={styles.support__title} as="h3" color="greyDark">
          Support
        </Text>

        <form action="" className={styles.support__form}>
          <div className={styles.support__formRow}>
            <Input
              className={styles.support__formField}
              name="name"
              placeholder="Name"
            />
            <Input
              className={styles.support__formField}
              name="Email"
              type="email"
              placeholder="Email"
            />
          </div>

          <div className={styles.support__formRow}>
            <InputSelect
              className={styles.support__formField}
              name="questiontype"
              placeholder="Type of question"
            />
          </div>

          <div className={styles.support__formRow}>
            <Input
              className={styles.support__formField}
              name="title"
              placeholder="Title"
            />
          </div>

          <div className={styles.support__formRow}>
            <Textarea
              className={styles.support__formField}
              name="Question"
              placeholder="Question"
              minRows={3}
              maxRows={3}
            />
          </div>

          <div className={styles.support__formRow}>
            <Checkbox
              name="terms"
              label={
                <Text
                  className={styles.support__formCheckboxText}
                  color="primary"
                  size="xsm"
                >
                  {"Terms & Conditions"}
                </Text>
              }
            />

            <Button theme="gradient" className={styles.support__btnSubmit}>
              <Text
                className={styles.support__btnSubmitText}
                color="white"
                size="sm"
                fontWeight="semibold"
              >
                Send
              </Text>
            </Button>
          </div>
        </form>
      </div>
    </WrapperPopup>
  );
};

export default PopupSupport;
