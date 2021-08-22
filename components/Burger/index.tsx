import { useEffect, useState } from "react";

// Import STYLES
import styles from "./Burger.module.scss";

type Props = {
  className?: string;
  onChange?: (state: boolean) => void;
  isActive: boolean;
  name: string;
};

const Burger: React.FC<Props> = ({ className, onChange, isActive, name }) => {
  const classNames = [styles.burger, className].join(" ");
  const [isActiveState, setIsActiveState] = useState<boolean>(false);

  useEffect(() => {
    setIsActiveState(isActive);
  }, [isActive]);

  const changeState = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(event.currentTarget.checked);
  };

  return (
    <div className={classNames}>
      <input
        id={`${name}Burger`}
        name={name}
        type="checkbox"
        className={styles.burger__checkbox}
        checked={isActiveState}
        onChange={changeState}
      />

      <label htmlFor={`${name}Burger`} className={styles.burger__elements}>
        <span className={styles.burger__element}></span>
        <span className={styles.burger__element}></span>
      </label>
    </div>
  );
};

export default Burger;
