import { useState } from "react";
import { useRouter } from "next/router";

// Import HOOKS
import { commonHooks } from "hooks";

const usePhoneConfirmation = () => {
  const route = useRouter();

  const [codeTimer, setCodeTimerState] = useState<number>(40);
  const [isSubmitDisabled, setIsSubmitDisabledState] = useState<boolean>(true);

  commonHooks.useInterval(
    function sendCodeAgainTimer() {
      setCodeTimerState((prevState) => prevState - 1);
    },
    codeTimer === 0 ? null : 1000
  );

  const onRouteBack = () => {
    route.back();
  };

  const onSendNewCode = () => {
    setCodeTimerState(40);
  };

  const onSubmit = (value: PhoneConfirmationFormValues) => {
    console.log("handleSumbit: ", value);
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
