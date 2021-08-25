import { useCallback, useEffect,useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import { setCookie } from "nookies";

// Import API
import { login, signup } from "api/auth";

// Import UTILS
import { validation } from "utils";

// Import HOOKS
import { libHooks } from "hooks";

// import COMPONENTS
import {
  BoxSimpleRounded,
  Text,
  Button,
  Input,
  SLink,
  IconSocial,
  Flexbox,
  Checkbox,
} from "components";

// import LAYOUTS
import { WrapperAuth } from "layouts";

// Import TEMPLATES
import { SOCIAL_LIST } from "./PageAuth.template";

// Import CONSTANTS
import { COMMON } from "const";

// Import STYLES
import styles from "./PageAuth.module.scss";

type Props = {
  className?: string;
  isSignup?: boolean;
  verified?: boolean;
};

const PageAuth: React.FC<Props> = ({ className, isSignup, verified }) => {
  const classNames = [styles.auth, className].join(" ");

  const router = useRouter();

  const { useNotification } = libHooks;
  const { setErrorNotification, setSucceedNotification } = useNotification();

  const [message, setMessage] = useState("")
   // FORMS
  const {
    register,
    handleSubmit,
    errors,
    setValue,
    watch,
  } = useForm<LoginSignupFormValues>({
    resolver: yupResolver(
      isSignup ? validation.signupSchema : validation.loginSchema
    ),
  });
  const checkboxValue = watch(isSignup ? "termsconditions" : "remember_me");

  useEffect(
    function verificationManager() {
      if (verified) {
        setSucceedNotification("Verification successful");
      }
    },
    [verified]
  );

  useEffect(
    function customFormFieldsManager() {
      if (isSignup) {
        register("termsconditions");
        setValue("termsconditions", false);
      } else {
        register("remember_me");
        setValue("remember_me", false);
      }
    },
    [isSignup]
  );

  useEffect(() => {
    console.log("checkboxValue: ", checkboxValue);
  }, [checkboxValue]);

  const handleAuth = (formValues: LoginSignupFormValues) => {
    const { email_phone, password, password_confirmation } = formValues;

    if (!isSignup) {
      login({ enterField: email_phone, password }).then((response) => {
        if (response.status) {
          setCookie(null, COMMON.COOKIES.TOKEN, response.payload.access_token, {
            path: "/",
            maxAge: response.payload.expires_in,
          });
          router.push("/profile");
        } else {
          setMessage(" Password or login is incorrect please check and try again ");
          if (response.message) {
            setErrorNotification(response.message);
          }
        }
      });
    } else {
      signup({ enterField: email_phone, password, password_confirmation }).then(
        (response) => {
          console.log("signup response: ", response);
          if (response.status) {
            if (response.payload.type === "email") {
              router.push("/login");
            } else {
              router.push("/phoneconfirm");
            }
          } else {
            if (response.message) {
              setErrorNotification(response.message);
            }
          }
        }
      );
    }
  };
  const handleRouteBack = () => {
    console.log("handleRouteBack");
  };

  const handleChangeCheckbox = useCallback(
    (state: boolean) => {
      setValue(isSignup ? "termsconditions" : "remember_me", state, {
        shouldValidate: true,
      });
    },
    [isSignup]
  );

  return (
    <WrapperAuth className={classNames} onBack={handleRouteBack}>
      <BoxSimpleRounded className={styles.auth__box}>
        <Flexbox direction="column" className={styles.auth__content}>
          <Text as="h3" color="greyDark" className={styles.auth__title}>
            {isSignup ? "Sign up" : "Login in"}
          </Text>

          <Text size="sm" color="greyDark" className={styles.auth__description}>
            {isSignup
              ? "Unlock the best of Exdating"
              : "Enter your details below to sign in"}
          </Text>

          <form
            className={styles.auth__form}
            onSubmit={handleSubmit(handleAuth)}
          >
            <Input
              register={register}
              type="text"
              placeholder={isSignup ? "Phone or email" : "Login or email"}
              name="email_phone"
              error={errors.email_phone}
              className={styles.auth__formField}
            />
            <Input
              register={register}
              type="password"
              placeholder="Password"
              name="password"
              error={errors.password}
              className={styles.auth__formField}
            />
            {isSignup && (
              <Input
                register={register}
                type="password"
                placeholder="Repeat password"
                name="password_confirmation"
                error={errors.password_confirmation}
                className={styles.auth__formField}
              />
            )}
        <Text
                  color="hotred"
                  size="sm"
                  className={styles.auth__errorMessage}
                >
                  {message}
                </Text>
            <div className={styles.auth__formBottomBlock}>
              <Checkbox
                name={isSignup ? "termsconditions" : "remember_me"}
                label={
                  <Text color="primary" size="xsm">
                    {isSignup ? "Terms & Conditions" : "Remember me"}
                  </Text>
                }
                error={errors.termsconditions}
                value={checkboxValue}
                onChange={handleChangeCheckbox}
              />

              <Button
                className={styles.auth__formSubmitBtn}
                type="submit"
                theme="gradient"
              >
                <Text
                  color="white"
                  size="sm"
                  className={styles.auth__formSubmitBtnText}
                >
                  {isSignup ? "Sign up" : "Log in"}
                </Text>
              </Button>
            </div>
          </form>

          <div className={styles.auth__social}>
            <Text
              className={styles.auth__socialDescription}
              color="moonlight"
              size="xsm"
            >
              {isSignup ? "or sign up with:" : "or sign in with:"}
            </Text>

            {SOCIAL_LIST.map((social) => (
              <SLink
                key={social.iconType}
                href={social.href}
                className={styles.auth__socialItem}
              >
                <IconSocial size="sm" social={social.iconType} />
              </SLink>
            ))}
          </div>
        </Flexbox>

        <Flexbox
          direction="column"
          justify="center"
          align="center"
          className={styles.auth__footer}
        >
          {!isSignup && (
            <SLink href="/forgotenpass" className={styles.auth__footerForgot}>
              {({ hoverState }) => (
                <Text size="xsm" color="orange" underline={hoverState}>
                  Forgot password?
                </Text>
              )}
            </SLink>
          )}

          <Text className={styles.auth__footerSignup}>
            <Text
              color="greyDark"
              size="xsm"
              inline
              className={styles.auth__footerSignupText}
            >
              {isSignup ? "Already have an account? " : "No account? "}
            </Text>
            <SLink href={`/${isSignup ? "login" : "signup"}`}>
              {({ hoverState }) => (
                <Text
                  className={styles.auth__footerSignupLinkText}
                  size="xsm"
                  color="orange"
                  underline={hoverState}
                >
                  {isSignup ? "Log in" : "Sign up"}
                </Text>
              )}
            </SLink>
          </Text>
        </Flexbox>
      </BoxSimpleRounded>
    </WrapperAuth>
  );
};

export default PageAuth;
