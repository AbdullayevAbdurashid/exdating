import { useCallback, useState } from "react";
import { Descendant } from "slate";

// Import COMPONENTS
import { TextEditor } from "components";

// Import STYLES
import styles from "./TextEditor.module.scss";

type Props = {
  className?: string;
  style?: React.CSSProperties;
  label: string;
  onChange?: (value: string, isEmpty: boolean) => void;
};

const TextEditorWithLabel: React.FC<Props> = ({
  className,
  style,
  label,
  onChange,
}) => {
  const classNames = [styles.editorWrapper, className].join(" ");

  // STATES
  const [isLabelActive, setIsLabelActive] = useState<boolean>(false);
  const [isEmptyText, setIsEmptyText] = useState(true);

  const handleFocus = useCallback(() => {
    setIsLabelActive(true);
  }, []);

  const handleBlur = useCallback(() => {
    if (isEmptyText) {
      setIsLabelActive(false);
    }
  }, [isEmptyText]);

  const handleOnChange = (value: string, isEmpty: boolean) => {
    setIsEmptyText(isEmpty);

    if (onChange) {
      onChange(value, isEmpty);
    }
  };

  return (
    <div style={style} className={classNames}>
      <span
        className={`${styles.editorWrapper__label} ${
          isLabelActive ? styles.editorWrapper__label_active : ""
        }`}
      >
        {label}
      </span>

      <TextEditor
        onChange={handleOnChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </div>
  );
};

export default TextEditorWithLabel;
