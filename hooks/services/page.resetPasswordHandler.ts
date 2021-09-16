import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import { parseCookies, destroyCookie } from "nookies";
// Import CONSTANTS
import { COMMON } from "const";
import { libHooks } from "hooks";

// Import API
import { restorePassword, resetPassword, } from "api/auth";

// Import UTILS
import { validation } from "utils";

const useResetPasswordHandlers = (isEmailConfirmed?: boolean,) => {
  const {
    COOKIES: { RESTORE_TOKEN },
  } = COMMON;

  // NEXTJS
  const route = useRouter();

  const { useNotification } = libHooks;
  const { setErrorNotification } = useNotification();
  const { setSucceedNotification } = useNotification();
  // FORM 
  const {
    register,
    handleSubmit,
    errors,
    reset,
  } = useForm<PasswordResetFormValues>({
    resolver: yupResolver(
      isEmailConfirmed ? validation.resetPassword : validation.forgotPassword
    ),
  });

  const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const handleConfirmEmail = (data: PasswordResetFormValues) => {
    restorePassword(data.email).then((sendMailResponse) => {
      if (sendMailResponse.status) {
        setSucceedNotification(data.email.match(mailformat) ? "We sended you email" : "We sended you code")
        if (data.email.match(mailformat)) {
          route.push("/login");
        } else {
          route.push(`/phoneconfirm?type=recover&phone=${data.email}`);
        }
      }

      else {
        setErrorNotification(data.email.match(mailformat) ? "This email is not existing or we have some problems up there" : "This phone number is not existing or we have some problems up there")
      }
    })
  }


  const handleChangePassword = (data: PasswordResetFormValues) => {
    const token = parseCookies(null)[RESTORE_TOKEN];

    resetPassword(data.password, token).then((resetPasswordResponse) => {
      console.log("resetPasswordResponse: ", resetPasswordResponse);
      reset();

      if (resetPasswordResponse.status) {
        setSucceedNotification("You changed youre password succesfully")

        destroyCookie(null, RESTORE_TOKEN);
        route.push("/login");
      } else {
        setErrorNotification("Youre code expired or something went wrong")

      }
    });
  };

  const handleRouteBack = () => {
    route.back();
  };

  const actions = { handleChangePassword, handleRouteBack, handleConfirmEmail };
  const form = { register, handleSubmit, errors };

  return { actions, form };
};

export default useResetPasswordHandlers;
