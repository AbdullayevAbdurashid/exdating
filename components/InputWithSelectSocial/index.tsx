// Import COMPONETS
import { InputSelect } from "components";

// Import MEDIA
import SearchIcon from "public/icons/icon-search.svg";

// Import STYLES
import styles from "./InputWithSelectSocial.module.scss";

type RefReturn =
  | string
  | ((instance: HTMLInputElement | null) => void)
  | React.RefObject<HTMLInputElement>
  | null
  | undefined;
type Props = {
  className?: string;
  nameSelect: string;
  nameInput: string;
  register: () => RefReturn;
};

const InputWithSelectSocial: React.FC<Props> = ({
  className,
  nameSelect,
  nameInput,
  register,
}) => {
  const classNames = [styles.input, className].join(" ");

  return (
    <div className={classNames}>
      <InputSelect
        name={nameSelect}
        register={register}
        className={styles.input__select}
        inputClassName={styles.input__selectInput}
        theme="borderedSplit"
      />

      <div className={styles.input__inputBox}>
        <input
          className={styles.input__input}
          name={nameInput}
          ref={register()}
          type="text"
          placeholder="Nickname or URL address"
        />

        <span className={styles.input__icon}>
          <SearchIcon width={11} height={11} />
        </span>
      </div>
    </div>
  );
};

export default InputWithSelectSocial;
