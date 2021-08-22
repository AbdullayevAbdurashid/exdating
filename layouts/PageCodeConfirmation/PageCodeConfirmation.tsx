// Import COMPONENTS
import { BoxSimpleRounded, Text, Button, Input } from "components";

// Import CONTROLLERS
import useCodeConfirmationController from "./PageCodeConfirmation.controller";

// Import LAYOUTS
import { WrapperAuth } from "layouts";

// Import STYLES
import styles from "./PageCodeConfirmation.module.scss";

type Props = {
  email: string;
};

const PageCodeConfirmation: React.FC<Props> = ({ email }) => {
  const classNames = [styles.codeConfirmation].join(" ");

  const {
    form: { register, errors, handleSubmit },
    actions: { handleConfirmCode, handleRouteBack },
  } = useCodeConfirmationController(email);

  return (
    <WrapperAuth onBack={handleRouteBack}>
      <BoxSimpleRounded className={classNames}>
        <Text as="h5" color="greyDark" fontWeight="semibold">
          Enter code
        </Text>

        <form
          className={styles.codeConfirmation__form}
          onSubmit={handleSubmit(handleConfirmCode)}
        >
          <Input
            className={styles.codeConfirmation__input}
            register={register}
            type="text"
            placeholder="Code"
            name="code"
            error={errors.code}
          />

          <Button
            className={styles.codeConfirmation__btnSubmit}
            theme="gradient"
            type="submit"
          >
            <Text color="white" size="sm">
              Confirm
            </Text>
          </Button>
        </form>
      </BoxSimpleRounded>
    </WrapperAuth>
  );
};

export default PageCodeConfirmation;
