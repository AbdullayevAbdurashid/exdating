import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import { parseCookies, destroyCookie } from "nookies";

// Import CONSTANTS
import { COMMON } from "const";

// Import API
import { restorePassword, resetPassword, restorePass } from "api/auth";

// Import UTILS
import { validation } from "utils";

const useResetPasswordHandlers = (isEmailConfirmed?: boolean) => {
  const {
    COOKIES: { RESTORE_TOKEN },
  } = COMMON;

  // NEXTJS
  const route = useRouter();

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

  const handleConfirmEmail = (data: PasswordResetFormValues) => {
    restorePassword(data.email).then((restorePasswordResponse) => {
      if (restorePasswordResponse.status) {
        route.push(`/codeconfirmation?email=${data.email}`);
      }
    });
  };

  const handleChangePassword = (data: PasswordResetFormValues) => {
    const token = parseCookies(null)[RESTORE_TOKEN];

    resetPassword(token, data.password).then((resetPasswordResponse) => {
      console.log("resetPasswordResponse: ", resetPasswordResponse);
      reset();

      if (resetPasswordResponse.status) {
        destroyCookie(null, RESTORE_TOKEN);
        route.push("/login");
      }
    });
  };

  const handleRouteBack = () => {
    route.back();
  };

  const actions = { handleConfirmEmail, handleChangePassword, handleRouteBack };
  const form = { register, handleSubmit, errors };

  return { actions, form };
};

export default useResetPasswordHandlers;
