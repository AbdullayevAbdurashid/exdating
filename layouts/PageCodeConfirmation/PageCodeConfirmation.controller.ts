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

const useCodeConfirmationController = (email: string, code: any) => {
  const {
    COOKIES: { RESTORE_TOKEN },
  } = COMMON;

  // NEXTJS
  const route = useRouter();

  // SERVICES
  const { useNotification } = libHooks;
  const { setErrorNotification } = useNotification();
  const { setSucceedNotification } = useNotification();

  // FORM
  const {
    register,
    errors,
    handleSubmit,
    reset,
  } = useForm<CodeConfirmationForm>({
    resolver: yupResolver(validation.codeConfirmSchema),
  });

  const handleConfirmCode = () => {
    restorePassword(email, code).then((restorePasswordResponse) => {
      console.log("restorePasswordResponse: ", restorePasswordResponse);
      reset();

      if (restorePasswordResponse.status) {
        setSucceedNotification("You succesfully verificated your email")
        if (restorePasswordResponse.payload.token) {
          setCookie(
            null,
            RESTORE_TOKEN,
            restorePasswordResponse.payload.token,
            {}
          );

          route.push(`/forgotenpass?verified=ok&enterField=${email}`);
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
