import React, { useEffect, useState, useRef, useMemo } from "react";
import { FieldError, FieldElement } from "react-hook-form";

// Import STYLES
import styles from "./Checkbox.module.scss";

type Props = {
  className?: string;
  label: React.ReactElement;
  name: string;
  error?: FieldError;
  isToggle?: boolean;
  isRightAlign?: boolean;
  theme?: "dark";
  value?: boolean;
  onChange?: (value: boolean) => void;
};

const Checkbox: React.FC<Props> = ({
  className,
  label,
  name,
  isToggle,
  isRightAlign,
  theme,
  value,
  onChange,
  error,
}) => {
  const [isCheckedState, setIsCheckedState] = useState<boolean>(false);

  const classNames = [
    styles.checkbox,
    theme ? styles[`checkbox_theme_${theme}`] : "",
    value ? styles.checkbox_isChecked : "",
    isToggle ? styles.checkbox_type_toggle : "",
    isRightAlign ? styles.checkbox_rightAlign : "",
    error ? styles.checkbox_error : "",
    className,
  ].join(" ");

  useEffect(() => {
    console.log("Checkbox error: ", error);
  }, [error]);

  useEffect(
    function checkingStateManager() {
      if (value != null) {
        setIsCheckedState(value);
      }
    },
    [value]
  );

  const handleChange = () => {
    if (onChange != null && value != null) {
      onChange(!value);
    }
  };

  const renderLabel = useMemo(() => {
    return React.cloneElement(label, {
      className: `${label.props.className} ${styles.checkbox__label}`,
    });
  }, [label]);

  return (
    <label htmlFor={name} className={classNames}>
      <input
        id={name}
        onChange={() => null}
        onClick={handleChange}
        type="checkbox"
        className={styles.checkbox__input}
        name={name}
        checked={isCheckedState}
      />

      {renderLabel}
    </label>
  );
};

export default Checkbox;
