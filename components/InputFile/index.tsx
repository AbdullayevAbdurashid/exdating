import { forwardRef } from "react";

// Import STYLES
import styles from "./InputFile.module.scss";

type Props = {
  className?: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
  children: React.ReactNode;
};

const InputFile = forwardRef<HTMLInputElement, Props>(
  ({ className, name, children, onChange, onClick }, ref) => {
    const classNames = [styles.inputFile, className].join(" ");

    return (
      <label className={classNames}>
        <input
          ref={ref}
          className={styles.inputFile__input}
          name={name}
          type="file"
          onChange={onChange}
          onClick={onClick}
        />

        {children}
      </label>
    );
  }
);

export default InputFile;
