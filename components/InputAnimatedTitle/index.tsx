import { useState, useEffect, useRef } from "react";
import { FieldError, FieldElement } from "react-hook-form";

// Import STYLES
import styles from "./InputAnimatedTitle.module.scss";

export type InputProps = {
  name: string;
  register: (ref: FieldElement | null) => void;
  className?: string;
  error?: FieldError;
  type?: "text" | "password" | "email";
  placeholder: string;
  disabled?: boolean;
  readOnly?: boolean;
};

const InputAnimatedTitle: React.FC<InputProps> = ({
  className,
  name,
  register,
  error,
  type,
  placeholder,
  disabled,
  readOnly,
}) => {
  const classNames = [styles.input, className].join(" ");

  const [isLabelActive, setIsLabelActive] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(function checkInitialLabelStatus() {
    if (inputRef.current!.value.length > 0) {
      setIsLabelActive(true);
    }
  }, []);

  const handleFocus = () => {
    setIsLabelActive(true);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (value.length === 0) {
      setIsLabelActive(false);
    }
  };

  return (
    <div className={classNames}>
      <input
        id={`${name}input`}
        className={`${styles.input__field} ${
          error ? styles.input__field_isError : ""
        }`}
        ref={(ref) => {
          inputRef.current = ref;
          register(ref);
        }}
        type={type}
        name={name}
        disabled={disabled}
        readOnly={readOnly}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />

      <label
        htmlFor={`${name}input`}
        className={`${styles.input__label} ${
          isLabelActive ? styles.input__label_active : ""
        }`}
      >
        {placeholder}
      </label>

      {error && <div className={styles.input__error}>{error.message}</div>}
    </div>
  );
};

export default InputAnimatedTitle;
