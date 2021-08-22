// Import STYLES
import styles from "./ScrollList.module.scss";

type Option = { item: React.ReactNode; id: string };

type Props = {
  className?: string;
  options: Option[];
  onOptionClick?: (option: Option) => void;
};

const ScrollList: React.FC<Props> = ({ className, options, onOptionClick }) => {
  const classNames = [styles.scrollList, className].join(" ");

  const handleClick = (option: Option) => {
    if (onOptionClick != null) {
      onOptionClick(option);
    }
  };

  return (
    <div className={classNames}>
      <ul className={styles.scrollList__item}>
        {options.length > 0 ? (
          options.map((option) => (
            <li key={option.id} className={styles.scrollList__option}>
              <div
                onClick={() => handleClick(option)}
                role="button"
                onKeyPress={() => null}
                tabIndex={0}
              >
                {option.item}
              </div>
            </li>
          ))
        ) : (
          <li>Нет значений</li>
        )}
      </ul>
    </div>
  );
};

export default ScrollList;
