import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import { yupResolver } from "@hookform/resolvers";

// Import SERVICES
import { libHooks } from "hooks";

// Import CONSTANTS
import { COMMON } from "const";

// Import API
import { restorePassword } from "api/auth";

// Import UTILS
import { validation } from "utils";

const useCodeConfirmationController = (email: string) => {
  const {
    COOKIES: { RESTORE_TOKEN },
  } = COMMON;

  // NEXTJS
  const route = useRouter();

  // SERVICES
  const { useNotification } = libHooks;
  const { setErrorNotification } = useNotification();

  // FORM
  const {
    register,
    errors,
    handleSubmit,
    reset,
  } = useForm<CodeConfirmationForm>({
    defaultValues: { code: "" },
    resolver: yupResolver(validation.codeConfirmSchema),
  });

  const handleConfirmCode = (data: CodeConfirmationForm) => {
    restorePassword(email, data.code).then((restorePasswordResponse) => {
      console.log("restorePasswordResponse: ", restorePasswordResponse);
      reset();

      if (restorePasswordResponse.status) {
        if (restorePasswordResponse.payload.token) {
          setCookie(
            null,
            RESTORE_TOKEN,
            restorePasswordResponse.payload.token,
            {}
          );

          route.push("/resetpassword");
        }
      } else {
        setErrorNotification(
          restorePasswordResponse.message || "Something went wrong!"
        );
      }
    });
  };

  const handleRouteBack = () => {
    route.back();
  };

  const actions = { handleConfirmCode, handleRouteBack };

  const form = { register, errors, handleSubmit };

  return { form, actions };
};

export default useCodeConfirmationController;
