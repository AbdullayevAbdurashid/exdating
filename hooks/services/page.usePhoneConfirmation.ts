import { useState } from "react";
import { useRouter } from "next/router";
import { restorePassword } from "api/auth";
import { COMMON } from "const";
import { setCookie } from "nookies"
// Import HOOKS
import { commonHooks } from "hooks";
import { libHooks } from "hooks";

const usePhoneConfirmation = () => {
  const router = useRouter();
  const {
    COOKIES: { RESTORE_TOKEN },
  } = COMMON;

  // NEXTJS

  // SERVICES
  const { useNotification } = libHooks;
  const { setErrorNotification } = useNotification();
  const { setSucceedNotification } = useNotification();

  const [codeTimer, setCodeTimerState] = useState<number>(40);
  const [isSubmitDisabled, setIsSubmitDisabledState] = useState<boolean>(true);

  commonHooks.useInterval(
    function sendCodeAgainTimer() {
      setCodeTimerState((prevState) => prevState - 1);
    },
    codeTimer === 0 ? null : 1000
  );

  const onRouteBack = () => {
    router.back();
  };

  const onSendNewCode = () => {
    setCodeTimerState(40);
  };

  const onSubmit = (value: PhoneConfirmationFormValues, phone: any) => {
    const code = Object.values(value).join("")
    restorePassword(phone, code).then((restorePasswordResponse) => {
      console.log("restorePasswordResponse: ", restorePasswordResponse);

      if (restorePasswordResponse.status) {
        setSucceedNotification("You succesfully verificated your phone")
        if (restorePasswordResponse.payload.token) {
          setCookie(
            null,
            RESTORE_TOKEN,
            restorePasswordResponse.payload.token,
            {}
          );

          router.push(`/forgotenpass?verified=ok&enterField=${phone}`);
        }
      } else {
        setErrorNotification(
          restorePasswordResponse.message || "Something went wrong!"
        );
      }
    });
  };

  const onCodeChange = (value: PhoneConfirmationFormValues) => {
    let codeValue: string = "";

    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        const element = value[key as keyof PhoneConfirmationFormValues];

        codeValue += element;
      }
    }

    if (codeValue.length >= 4) {
      setIsSubmitDisabledState(false);
    } else {
      setIsSubmitDisabledState(true);
    }
  };

  return {
    codeTimer,
    onRouteBack,
    onSendNewCode,
    onSubmit,
    onCodeChange,
    isSubmitDisabled,
  };
};

export default usePhoneConfirmation;
