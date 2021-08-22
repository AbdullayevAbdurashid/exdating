import { useMemo, useState, ChangeEvent, useEffect, useRef } from "react";

// Import COMPONENTS
import Input, { InputProps } from "../Input";
import Button from "../Button";

// Import HOOKS
import { commonHooks } from "hooks";

// Import STYLES
import styles from "./InputWithOptions.module.scss";

type Option = { id: string; value: string };

type InputWithOptionsProps = InputProps & {
  options: Option[];
  setValue?: (
    name: any,
    value: unknown,
    config?:
      | Partial<{
          shouldValidate: boolean;
          shouldDirty: boolean;
        }>
      | undefined
  ) => void;
  initialValue?: string | null;
};

const InputWithOptions: React.FC<InputWithOptionsProps> = ({
  options,
  setValue,
  initialValue,
  ...inputProps
}) => {
  const classNames = [styles.input].join(" ");
  const { register, name, ...visualInputProps } = inputProps;
  const inputWithOptionsRef = useRef<HTMLDivElement>(null);

  // STATES
  const [isOptionsActive, setIsOptionsActive] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // HOOKS
  const { useOutsideClick } = commonHooks;
  useOutsideClick(inputWithOptionsRef, () => {
    setIsFocused(false);
  });

  useEffect(() => {
    if (initialValue != null) {
      setInputValue(initialValue);
    }
  }, [initialValue]);

  useEffect(() => {
    setIsOptionsActive(inputValue.length >= 3);
  }, [inputValue]);

  useEffect(() => {
    console.log("options:", options);
  }, [options]);

  const handlePickOption = (pickedOption: Option) => {
    if (setValue) {
      setValue(inputProps.name, pickedOption.id, { shouldDirty: true });
      setInputValue(pickedOption.value);
      setIsFocused(false);
    }
  };

  const getOptions = useMemo(() => {
    if (inputValue.length < 3) {
      return null;
    }

    return options
      .filter((option) =>
        option.value.toLowerCase().includes(inputValue.toLowerCase())
      )
      .map((option) => (
        <li key={option.id}>
          <Button
            onClick={() => handlePickOption(option)}
            className={styles.input__optionsItem}
          >
            {option.value}
          </Button>
        </li>
      ));
  }, [options, inputValue]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  return (
    <div ref={inputWithOptionsRef} className={classNames}>
      <Input
        onFocus={handleFocus}
        // onBlur={handleBlur}
        onChange={handleChange}
        {...visualInputProps}
        value={inputValue}
        name={`${name}_uncontrolled`}
      />

      <input className={styles.input__inputHidden} name={name} ref={register} />

      {options.length > 0 && isOptionsActive && isFocused && (
        <ul className={styles.input__options}>{getOptions}</ul>
      )}
    </div>
  );
};

export default InputWithOptions;
