import { createRef, useRef } from "react";
import { useForm, Controller } from "react-hook-form";

// Import HOOKS
import { serviceHooks } from "hooks";

// import LAYOUTS
import { WrapperAuth } from "layouts";

// import COMPONENTS
import { BoxSimpleRounded, Text, Button, InputCode, Flexbox } from "components";

// import TEMPLATES
import { CODE_INPUTS } from "./PagePhoneConfirmation.template";

// Import STYLES
import styles from "./PagePhoneConfirmation.module.scss";

type Props = {
  phone?: any
  isRestore?: boolean;
  className?: string;
};

const PagePhoneConfirmation: React.FC<Props> = ({ className, isRestore, phone }) => {
  const classNames = [styles.phoneConfirmation, className].join(" ");

  const {
    codeTimer,
    onRouteBack,
    onSendNewCode,
    onSubmit,
    onCodeChange,
    isSubmitDisabled,
  } = serviceHooks.usePhoneConfirmation();

  const { handleSubmit, control, getValues } = useForm<
    PhoneConfirmationFormValues
  >();

  const inputListRefs = useRef<React.RefObject<HTMLInputElement>[]>(
    CODE_INPUTS.map(() => createRef())
  );

  const handleFormSubmit = (data: PhoneConfirmationFormValues) =>
    onSubmit(data, phone);

  const handleOnValueSet = (index: number) => {
    const formvalues = getValues();

    onCodeChange(formvalues);

    if (index + 1 < CODE_INPUTS.length) {
      inputListRefs.current[index + 1].current?.focus();
    }
  };

  return (
    <WrapperAuth onBack={onRouteBack}>
      <BoxSimpleRounded className={classNames}>
        <Text
          as="h3"
          color="greyDark"
          className={styles.phoneConfirmation__title}
        >
          Phone number confirmation
        </Text>
        <Text
          color="greyDark"
          size="sm"
          className={styles.phoneConfirmation__description}
        >
          Enter the code sent to you by phone number
        </Text>

        <form
          className={styles.phoneConfirmation__form}
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <Flexbox>
            {CODE_INPUTS.map((input, index) => (
              <Controller
                key={input.name}
                name={input.name}
                control={control}
                defaultValue=""
                // rules={{ required: true }}
                render={(props) => (
                  <InputCode
                    {...props}
                    ref={inputListRefs.current[index]}
                    className={styles.phoneConfirmation__formInput}
                    onValueSet={() => handleOnValueSet(index)}
                  />
                )} // props contains: onChange, onBlur and value
              />
            ))}
          </Flexbox>

          <Button
            theme="gradient"
            type="submit"
            className={styles.phoneConfirmation__formSubmit}
            disabled={isSubmitDisabled}
          >
            <Text fontWeight="semibold" color="white" size="sm">
              Confirm
            </Text>
          </Button>
        </form>

        {/* <div className={styles.phoneConfirmation__status}>
          {codeTimer !== 0 ? (
            <div className={styles.phoneConfirmation__statusTimer}>
              <Text size="xsm" color="greyDark" inline>
                You can send a new one in{" "}
              </Text>
              <Text size="xsm" inline color="orange">
                {codeTimer}
              </Text>
              <Text size="xsm" color="greyDark" inline>
                {" "}
                seconds
              </Text>

              <Text
                color="green"
                fontWeight="semibold"
                size="xsm"
                className={styles.phoneConfirmation__statusCodeSent}
              >
                New code sent
              </Text>
            </div>
          ) : (
            <Button
              theme="transparent"
              className={styles.phoneConfirmation__statusBtn}
              onClick={onSendNewCode}
            >
              <Text size="xsm" color="orange">
                Send a new code
              </Text>
            </Button>
          )}
        </div> */}
      </BoxSimpleRounded>
    </WrapperAuth>
  );
};

export default PagePhoneConfirmation;
