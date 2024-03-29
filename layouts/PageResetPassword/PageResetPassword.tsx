// Import HOOKS
import { serviceHooks } from "hooks";

// Import COMPONENTS
import { BoxSimpleRounded, Text, Button, Input } from "components";

// Import LAYOUTS
import { WrapperAuth } from "layouts";
import { useRouter } from 'next/router';

// SERVICES
import { libHooks } from "hooks";



// Import STYLES
import styles from "./PageResetPassword.module.scss";

type Props = {
  className?: string;
  isEmailConfirmed?: boolean;
  verified?: boolean;
};

const PageResetPassword: React.FC<Props> = ({
  className,
  isEmailConfirmed,
}) => {
  const classNames = [
    styles.resetPassword,
    isEmailConfirmed ? styles.resetPassword_reset : "",
    className,
  ].join(" ");

  // SERVICES
  const { useResetPasswordHandlers } = serviceHooks;
  const {
    actions: { handleChangePassword, handleRouteBack, handleConfirmEmail },
    form: { errors, handleSubmit, register },
  } = useResetPasswordHandlers(isEmailConfirmed);

  return (
    <WrapperAuth onBack={handleRouteBack}>
      <BoxSimpleRounded className={classNames}>
        <Text
          className={styles.resetPassword__title}
          as="h5"
          color="greyDark"
          fontWeight="semibold"
        >
          {isEmailConfirmed ? "Reset Password" : "Forgot password?"}  </Text>
        <Text
          className={styles.resetPassword__description}
          size="sm"
          color="grey"
        >
          {isEmailConfirmed ? "" : "Enter the email address or phone number you used when you joined and we’ll send you instructions to reset your password."}
        </Text>
        <Text
          className={styles.resetPassword__description}
          size="sm"
          color="grey"
        >
          {isEmailConfirmed ? "" : "For security reasons, we do NOT store your password. So rest assured that we will never send your password via email."}
        </Text>
        <Text
          size="sm"
          color="greyDark"
          className={styles.resetPassword__description}
        >
          {isEmailConfirmed ? "Create a new password" : ""}
        </Text>

        <form
          className={styles.resetPassword__form}
          onSubmit={
            isEmailConfirmed
              ? handleSubmit(handleChangePassword)
              : handleSubmit(handleConfirmEmail)
          }
        >
          {!isEmailConfirmed && (
            <Input
              register={register}
              type="text"
              error={errors.email}
              name="email"
              placeholder="Phone number or  email"
              className={styles.resetPassword__formEmail}
            />
          )}

          {isEmailConfirmed && (
            <>
              <Input
                register={register}
                type="password"
                placeholder="New password"
                name="password"
                error={errors.password}
                className={styles.resetPassword__formPassword}
              />

              <Input
                register={register}
                type="password"
                placeholder="Repeat"
                name="repeatpassword"
                error={errors.repeatpassword}
                className={styles.resetPassword__formPassword}
              />
            </>
          )}

          <Button
            theme="gradient"
            type="submit"
            className={styles.resetPassword__submitBtn}
          >
            <Text color="white" size="sm">
              {isEmailConfirmed ? "Change" : "Send"}
            </Text>
          </Button>
        </form>
      </BoxSimpleRounded>
    </WrapperAuth>
  );
};

export default PageResetPassword;
