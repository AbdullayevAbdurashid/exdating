import { ChangeEvent, FocusEventHandler } from "react";
import { FieldError } from "react-hook-form";

// Import STYLES
import styles from "./Input.module.scss";

type RefReturn =
  | string
  | ((instance: HTMLInputElement | null) => void)
  | React.RefObject<HTMLInputElement>
  | null
  | undefined;

interface InputCommonProps {
  name: string;
  className?: string;
  error?: FieldError;
  type?: "text" | "password" | "email";
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  isSearchType?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
}

interface InputRegisterProps extends InputCommonProps {
  register: () => RefReturn;
  value?: undefined;
}

interface InputManualProps extends InputCommonProps {
  value?: string | number;
  register?: undefined;
}

export type InputProps = InputRegisterProps | InputManualProps;

const Input: React.FC<InputProps> = ({
  className,
  register,
  error,
  type = "text",
  placeholder,
  name,
  disabled,
  readOnly,
  isSearchType,
  onChange,
  onFocus,
  onBlur,
  value,
}) => {
  const classNames = [
    styles.input,
    isSearchType ? styles.input_type_isSearchType : "",
    className,
  ].join(" ");

  return (
    <div className={classNames}>
      <input
        className={`${styles.input__field} ${
          error ? styles.input__field_isError : ""
        }`}
        ref={register ? register() : undefined}
        type={type}
        placeholder={placeholder}
        name={name}
        disabled={disabled}
        readOnly={readOnly}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />

      {error && <div className={styles.input__error}>{error.message}</div>}
    </div>
  );
};

export default Input;
