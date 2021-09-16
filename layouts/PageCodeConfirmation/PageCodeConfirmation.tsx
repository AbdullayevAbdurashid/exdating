// Import COMPONENTS
import { BoxSimpleRounded, Text, Button, Input } from "components";
import { useEffect, useRef } from "react"
// Import CONTROLLERS
import useCodeConfirmationController from "./PageCodeConfirmation.controller";

// Import LAYOUTS
import { WrapperAuth } from "layouts";

// Import STYLES
import styles from "./PageCodeConfirmation.module.scss";

type Props = {
  email: string;
  code?: any;
};

const PageCodeConfirmation: React.FC<Props> = ({ email, code }) => {
  const classNames = [styles.codeConfirmation].join(" ");
  const formRef = useRef(null);

  const {
    form: { register, errors, handleSubmit },
    actions: { handleConfirmCode, handleRouteBack },
  } = useCodeConfirmationController(email, code);
  useEffect(() => {
    handleConfirmCode()
  }, [])
  return (
    <WrapperAuth onBack={handleRouteBack}>
      <BoxSimpleRounded className={classNames}>
        <h1> Processing...</h1>
      </BoxSimpleRounded>
    </WrapperAuth>
  );
};

export default PageCodeConfirmation;
