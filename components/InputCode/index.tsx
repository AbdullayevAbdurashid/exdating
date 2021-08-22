import { useState, forwardRef } from "react";

// Import STYLES
import styles from "./InputCode.module.scss";

type Props = {
  className?: string;
  name: string;
  onChange: (...event: any[]) => void;
  onValueSet: (value: string) => void;
};

const InputCode = forwardRef<HTMLInputElement, Props>(
  ({ className, name, onChange, onValueSet }, ref) => {
    const classNames = [styles.inputCode, className].join(" ");

    const [valueState, setValueState] = useState<string>("");

    const handleChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
      event.preventDefault();
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
      const value: number = parseInt(event.key, 10);

      if (!isNaN(value)) {
        const valueString: string = value.toString();

        setValueState(valueString);
        onChange(valueString);
        onValueSet(valueString);
      }
    };

    return (
      <div className={classNames}>
        <input
          ref={ref}
          name={name}
          className={styles.inputCode__input}
          type="text"
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          value={valueState}
        />
      </div>
    );
  }
);

export default InputCode;
