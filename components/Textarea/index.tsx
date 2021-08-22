import { useCallback, useState, useEffect, useRef } from "react";
import { FieldError, FieldElement } from "react-hook-form";

// Import STYLES
import styles from "./Textarea.module.scss";

interface TextareaBasicProps {
  className?: string;
  fieldClassName?: string;
  register?: (ref?: FieldElement | null) => void;
  name: string;
  lineHeight?: string;
  minRows?: number;
  maxRows?: number;
  error?: FieldError;
  placeholder?: string;
}

interface TextareaAnimatedTitleProps extends TextareaBasicProps {
  theme: "animatedTitle";
  label: string;
}

interface TextareaCommonProps extends TextareaBasicProps {
  theme?: undefined;
  label?: undefined;
}

export type TextareaProps = TextareaAnimatedTitleProps | TextareaCommonProps;

const Textarea: React.FC<TextareaProps> = ({
  className,
  register,
  error,
  name,
  fieldClassName,
  lineHeight = "24px",
  minRows = 2,
  maxRows = 10,
  theme,
  label,
  placeholder,
  children,
}) => {
  const classNames = [
    styles.textarea,
    theme ? styles[`textarea_theme_${theme}`] : "",
    className,
  ].join(" ");

  const [rowsState, setRowsState] = useState(minRows);
  const [isLabelActive, setIsLabelActive] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(function checkInitialLabelStatus() {
    if (textareaRef.current!.value.length > 0) {
      setIsLabelActive(true);
    }
  }, []);

  const handleFocus = useCallback(() => {
    if (theme === "animatedTitle") {
      setIsLabelActive(true);
    }
  }, [theme]);

  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLTextAreaElement>) => {
      if (theme === "animatedTitle") {
        const value = event.target.value;

        if (value.length === 0) {
          setIsLabelActive(false);
        }
      }
    },
    [theme]
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const previousRows = event.target.rows;
      event.target.rows = minRows; // reset number of rows in textarea

      const currentRows = ~~(
        event.target.scrollHeight / parseInt(lineHeight, 10)
      );

      if (currentRows === previousRows) {
        event.target.rows = currentRows;
      }

      if (currentRows >= maxRows) {
        event.target.rows = maxRows;
        event.target.scrollTop = event.target.scrollHeight;
      }

      setRowsState(currentRows < maxRows ? currentRows : maxRows);
    },
    [rowsState, minRows, maxRows, lineHeight]
  );

  return (
    <div className={classNames}>
      <textarea
        className={`${styles.textarea__field} ${
          error ? styles.textarea__field_isError : ""
        } ${fieldClassName ? fieldClassName : ""}`}
        ref={(ref) => {
          textareaRef.current = ref;
          register && register(ref);
        }}
        name={name}
        onChange={handleChange}
        style={{ lineHeight }}
        rows={rowsState}
        id={`${name}textarea`}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={theme === "animatedTitle" ? undefined : placeholder}
      />

      {label && (
        <label
          htmlFor={`${name}textarea`}
          className={`${styles.textarea__label} ${
            isLabelActive ? styles.textarea__label_active : ""
          }`}
        >
          {label}
        </label>
      )}

      {children}

      {error && <div className={styles.textarea__error}>{error.message}</div>}
    </div>
  );
};

export default Textarea;
